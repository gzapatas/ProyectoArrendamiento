package utils

func AnyEqual(variable int32, values ...interface{}) bool {
    if len(values) >= 1 {
        for _, value := range values {
            if variable == value {
                return true
            }
        }
    }
    return false
}