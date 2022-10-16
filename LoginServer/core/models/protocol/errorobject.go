package protocol

const (
	NO_ERROR = iota
	INVALID_JSON
	INCOMPLETE_DATA
	INVALID_DATA
	INTERNAL_ERROR = 998
	UNKNOW_ERROR = 999
)

type ErrorObject struct{
	ResponseCode	int
	ResponseString	string
	Description		string 		`json:"Message,omitempty"`
}

func (o* ErrorObject) SetError(code int, message string) {
	switch code {
		case NO_ERROR:
			o.Description = "Ok"
			o.ResponseCode = NO_ERROR
			o.Description = message
			break
		case INVALID_JSON:
			o.Description = "Invalid JSON"
			o.ResponseCode = INVALID_JSON
			o.Description = message
			break
		case INCOMPLETE_DATA:
			o.Description = "Malformed JSON"
			o.ResponseCode = INCOMPLETE_DATA
			o.Description = message
			break
		case INVALID_DATA:
			o.Description = "Incomplete JSON"
			o.ResponseCode = INVALID_DATA
			o.Description = message
			break
		case UNKNOW_ERROR:
			o.Description = "DB Unresponsive"
			o.ResponseCode = UNKNOW_ERROR
			o.Description = message
			break
		case INTERNAL_ERROR:
			o.Description = "Internal Error"
			o.ResponseCode = INTERNAL_ERROR
			o.Description = message
			break
		default:
			o.Description = "Internal Error"
			o.ResponseCode = INTERNAL_ERROR
			o.Description = message
			break
	}
}

func GetErrorObject(code int, description string) *ErrorObject{
	ret := new(ErrorObject)

	ret.ResponseCode = int(code)

	switch code {
		case NO_ERROR:
			ret.ResponseString = "Ok"
			break;
		case INVALID_JSON:
			ret.ResponseString = "Invalid JSON"
			break;
		case INCOMPLETE_DATA:
			ret.ResponseString = "Incomplete Data"
			break;
		case INTERNAL_ERROR:
			ret.ResponseString = "Internal Error"
			break;
		case UNKNOW_ERROR:
			ret.ResponseString = "Unknow Error"
			break;
	}

	ret.Description = description

	return ret
}