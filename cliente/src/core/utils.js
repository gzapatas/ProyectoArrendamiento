class FormatterWithSign extends Intl.NumberFormat {
    format(x,isNegative) {
        var res = super.format(x);
    
        if(isNegative){
            return "−" + res;
        }
        else {
            return res;
        }
    }
}

export default class Utils{
    static numberFormat(value) {
        var isNegative = false
        if (value < 0) {
            value *= -1
            isNegative = true
        }

        return new FormatterWithSign('es-PE', {
            style: 'currency',
            currency: 'PEN',
            currencyDisplay: "narrowSymbol"
          }).format(value,isNegative);
    }
}