var months = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
           "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

const GetMonth = (month) => {
    return months[month-1];
}

export default GetMonth;