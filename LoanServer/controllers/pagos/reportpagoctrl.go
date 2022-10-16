package pagos

import (
	"app/core"
	"app/core/models/database"
	pa "app/core/models/protocol/pagos"
	"fmt"
	"strconv"
	"strings"
	"time"
)
func diff(a, b time.Time) (year, month, day, hour, min, sec int32) {
	if a.Location() != b.Location() {
		b = b.In(a.Location())
	}
	if a.After(b) {
		a, b = b, a
	}
	y1, M1, d1 := a.Date()
	y2, M2, d2 := b.Date()

	h1, m1, s1 := a.Clock()
	h2, m2, s2 := b.Clock()

	year = int32(y2 - y1)
	month = int32(M2 - M1)
	day = int32(d2 - d1)
	hour = int32(h2 - h1)
	min = int32(m2 - m1)
	sec = int32(s2 - s1)

	// Normalize negative values
	if sec < 0 {
		sec += 60
		min--
	}
	if min < 0 {
		min += 60
		hour--
	}
	if hour < 0 {
		hour += 24
		day--
	}
	if day < 0 {
		// days in month:
		t := time.Date(y1, M1, 32, 0, 0, 0, 0, time.UTC)
		day += 32 - int32(t.Day())
		month--
	}
	if month < 0 {
		month += 12
		year--
	}

	return
}


func CtrlReportePago(obj *pa.ReportPagoClient) map[uint64]pa.ReportData {
	var result []database.ReportPago

	var query string = `SELECT p.pago_monto AS monto, p.pago_anio AS anio, p.fecha_pago AS fecha, p.pago_cuota AS cuota,
	c.contrato_monto AS valor_cuota, c.contrato_inicio AS inicio, c.contrato_fin AS fin, c.contrato_nombre AS contrato_nombre, 
	c.contrato_cuotas AS total_cuotas, c.contrato_pago_total AS total, c.contrato_pago_inicial AS inicial,
	c.contrato_comentario AS comentario,
	l.lote_id AS lote_id, l.lote_sector AS sector, l.lote_manzana AS mz, l.lote_nro AS nro
	FROM pagos p INNER JOIN contratos c ON c.contrato_id = p.pago_contrato
	INNER JOIN lotes l ON l.lote_id = c.contrato_idlote`

	var andLike []string

	if obj.Sector != "" {
		andLike = append(andLike, fmt.Sprintf("LOWER(l.lote_sector) LIKE LOWER('%%%v%%')",obj.Sector)) 
	}

	if obj.Number != "" {
		andLike = append(andLike, fmt.Sprintf("LOWER(l.lote_nro) LIKE LOWER('%%%v%%')",obj.Number)) 
	}

	if obj.Block != "" {
		andLike = append(andLike, fmt.Sprintf("LOWER(l.lote_manzana) LIKE LOWER('%%%v%%')",obj.Block)) 
	}

	if len(andLike) > 0 {
		query += fmt.Sprintf(" WHERE %v AND p.pago_estado = %v ORDER BY p.pago_cuota",
								strings.Join(andLike," AND "),core.PAGO_REALIZADO)
	} else {
		query += fmt.Sprintf(" WHERE p.pago_estado = %v ORDER BY p.pago_cuota",core.PAGO_REALIZADO)
	}
	
	core.Database.Raw(query).Scan(&result)
	report := make(map[uint64]pa.ReportData)
	lotesKeys := make([]string, 0)
	
	for _,item := range result {
		val, ok := report[item.LoteId]
		if !ok {
			var QuotesMustBePaid int32 = 0
			lotesKeys = append(lotesKeys, strconv.FormatUint(item.LoteId,10))
			start,err := time.Parse("2006-01-02",item.ContractStart)

			if err == nil {
				_, QuotesMustBePaid, _, _, _, _ = diff(start,time.Now())
			}
			val = pa.ReportData {
				QuotesMap: make(map[uint32]bool),
				QuotesMustBePaid: uint32(QuotesMustBePaid),
				Quotes: []pa.QuoteData{},
				TotalQuotes: item.TotalQuotes,
				MonthAmount: float64(item.QuoteAmount)/100.00,
				TotalAmount: float64(item.TotalAmount)/100.00,
				InitialAmount: float64(item.InitialAmount)/100.00,
				ContractStart: item.ContractStart,
				ContractEnd: item.ContractEnd,
				ContractName: item.ContractName,
				Comment: item.Comment,
				Sector: item.Sector,
				Mz: item.Mz,
				Number: item.Number,
				SumMonthAmount: 0,
				IsInitialPaid: false,
			}
		}

		pay := float64(item.Amount)/100.00
		val.Quotes = append(val.Quotes,pa.QuoteData{
			Date: item.PayDate,
			Year: item.Year,
			Amount: pay,
			Quote: item.Quote,
		})

		if item.Quote == 0 {
			val.SumAmountInitial += pay
			val.IsInitialPaid = val.SumAmountInitial >= val.InitialAmount
		} else {
			_, ok = val.QuotesMap[item.Quote]
			if !ok {
				val.QuotesMap[item.Quote] = true
				val.QuotesPaid++
			}
			val.SumMonthAmount += pay
		}

		report[item.LoteId] = val
	}

	var queryTotals string = `SELECT c.contrato_monto AS valor_cuota, c.contrato_inicio AS inicio, c.contrato_fin AS fin, 
	c.contrato_nombre AS contrato_nombre, c.contrato_cuotas AS total_cuotas,
	c.contrato_pago_total AS total, c.contrato_pago_inicial AS inicial, l.lote_id AS lote_id, l.lote_sector AS sector, 
	l.lote_manzana AS mz, l.lote_nro AS nro FROM lotes l INNER JOIN contratos c ON l.lote_id = c.contrato_idlote`

	if len(lotesKeys) > 0 {
		andLike = append(andLike, fmt.Sprintf("c.contrato_estado != %v",core.CONTRATO_ANULADO)) 
	}

	if len(lotesKeys) > 0 {
		andLike = append(andLike, fmt.Sprintf("l.lote_id NOT IN (%v)",strings.Join(lotesKeys,","))) 
	}

	if len(andLike) > 0 {
		queryTotals += fmt.Sprintf(" WHERE %v",strings.Join(andLike," AND "))
	}

	result = []database.ReportPago{}

	core.Database.Raw(queryTotals).Scan(&result)
	for _,item := range result {
		var QuotesMustBePaid int32 = 0
		start,err := time.Parse("2006-01-02",item.ContractStart)

		if err == nil {
			_, QuotesMustBePaid, _, _, _, _ = diff(start,time.Now())
		}
		val := pa.ReportData {
			QuotesMap: make(map[uint32]bool),
			QuotesMustBePaid: uint32(QuotesMustBePaid),
			Quotes: []pa.QuoteData{},
			TotalQuotes: item.TotalQuotes,
			MonthAmount: float64(item.QuoteAmount)/100.00,
			TotalAmount: float64(item.TotalAmount)/100.00,
			InitialAmount: float64(item.InitialAmount)/100.00,
			ContractStart: item.ContractStart,
			ContractEnd: item.ContractEnd,
			ContractName: item.ContractName,
			Sector: item.Sector,
			Mz: item.Mz,
			Number: item.Number,
			SumMonthAmount: 0,
			IsInitialPaid: false,
		}

		report[item.LoteId] = val
	}

	return report
}