package pagos

type ReportPagoClient struct{
	Sector		string
	Block		string
	Number		string
}

func (o *ReportPagoClient) Check() string{
	return ""
}

type QuoteData struct{
	Date			string
	Year			uint64
	Amount			float64
	Quote			uint32
}

type ReportData struct {
	QuotesMap			map[uint32]bool `json:"-"`
	QuotesPaid			uint32
	QuotesMustBePaid	uint32
	Quotes				[]QuoteData
	IsInitialPaid		bool
	SumAmountInitial	float64
	TotalQuotes			uint32
	SumMonthAmount		float64
	MonthAmount			float64
	TotalAmount			float64
	InitialAmount		float64
	ContractStart		string
	ContractEnd			string
	ContractName		string
	Comment				string
	Sector				string
	Mz					string
	Number				string
}

func (o* ReportPagoServer) AddItem(report ReportData){
	o.Info = append(o.Info, report)
}

type ReportPagoServer struct{
	ResponseCode	int
	Info			[]ReportData
	ResponseString	string
}
