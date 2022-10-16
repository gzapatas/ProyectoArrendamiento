package contratos

import (
	"app/controllers/estados"
	"app/core"
	"app/core/models/database"
	ct "app/core/models/protocol/contratos"
	"fmt"
	"strings"
)

//Funcion para obtener dispositivos
func CtrlGetContratos(obj *ct.GetContratosClient) ([]database.GetContratos, map[int32]database.Estados){
	var contratos []database.GetContratos

	var query string = `SELECT * FROM contratos c INNER JOIN lotes l ON l.lote_id = c.contrato_idlote`

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

	if obj.Status != "" {
		andLike = append(andLike, fmt.Sprintf("c.contrato_estado = %v", obj.Status)) 
	} else {
		andLike = append(andLike, fmt.Sprintf("c.contrato_estado != %v", core.CONTRATO_ANULADO)) 
	}

	if len(andLike) > 0 {
		query += fmt.Sprintf(" WHERE %v", strings.Join(andLike," AND "))
	}

	fmt.Println(query)
	core.Database.Raw(query).Scan(&contratos)

	states := estados.CtrlGetStatesByIndex(core.CONTRATO)
	
	return contratos, states
}