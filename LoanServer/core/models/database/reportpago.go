package database


type ReportPago struct {
	Amount			uint64			`gorm:"column:monto"`
	QuoteAmount		uint64			`gorm:"column:valor_cuota"`
	TotalAmount		uint64			`gorm:"column:total"`
	InitialAmount	uint64			`gorm:"column:inicial"`
	TotalQuotes		uint32			`gorm:"column:total_cuotas"`
	Quote			uint32			`gorm:"column:cuota"`
	Month			uint64			`gorm:"column:mes"`
	Year			uint64			`gorm:"column:anio"`
	PayDate			string			`gorm:"column:fecha"`
	ContractStart	string			`gorm:"column:inicio"`
	ContractEnd		string			`gorm:"column:fin"`
	ContractName	string			`gorm:"column:contrato_nombre"`
	Comment			string			`gorm:"column:comentario"`
	LoteId			uint64			`gorm:"column:lote_id"`
	Sector			string			`gorm:"column:sector"`
	Mz				string			`gorm:"column:mz"`
	Number			string			`gorm:"column:nro"`
}
