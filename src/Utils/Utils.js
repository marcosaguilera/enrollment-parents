let getServiceCode =  function(serviceName){
    //////// Annual services
    if(serviceName === 'Matricula Plena')    { return '0001' }
    if(serviceName === 'Matricula 50')       { return '0003' }
    if(serviceName === 'Matricula 100')      { return '0002' }
    if(serviceName === 'Bibliobanco')        { return '0005' }
    if(serviceName === 'Seguro accidentes')  { return '0008' }
    if(serviceName === 'Asopadres')          { return '0010' }
    if(serviceName === 'Club deportivo')     { return '0200' }
    if(serviceName === 'Impreso')            { return '0007' }
    if(serviceName === 'Digital')            { return '0006' }
    if(serviceName === 'Impreso y digital - $156.000'){ return 'XXXX' }

    //////// Montly services
    if(serviceName === 'Pension Plena')      { return '0020' }
    if(serviceName === 'Pension 50')         { return '0022' }
    if(serviceName === 'Pension 100')        { return '0021' }
    if(serviceName === 'Completo Cercano')   { return '0026' }
    if(serviceName === 'Completo Intermedio'){ return '0027' }
    if(serviceName === 'Completo Lejano')    { return '0028' }
    if(serviceName === 'Medio Lejano')       { return '0031' }
    if(serviceName === 'Medio Intermedio')   { return '0030' }
    if(serviceName === 'Medio Cercano')      { return '0029' }
    if(serviceName === 'Almuerzo')           { return '0024' }
    if(serviceName === 'Medias Nueves')      { return '0025' }
    if(serviceName === 'Desayuno')           { return '0098' }
    if(serviceName === 'Seguro de vida')     { return '0032' }
    if(serviceName === 'Seguro desempleo')   { return '0092' }
    if(serviceName === '1 corazon')          { return '0085' }
    if(serviceName === '2 corazones')        { return '0086' }
    if(serviceName === '3 corazones')        { return '0087' }
    if(serviceName === '4 corazones')        { return '0088' }

    //////// Eco/Club services
    if(serviceName === "Lineal 1 día semanal (sin transporte curricular)"){ return "1007" }
    if(serviceName === "Lineal 2 días semanales (sin transporte curricular)"){ return "1011" }
    if(serviceName === "Lineal 3 días semanales (sin transporte curricular)"){ return "1012" }
    if(serviceName === "Lineal 4 días semanales (sin transporte curricular)"){ return "1013" }

    if(serviceName === "Puerta a puerta 1 día (sin transporte curricular)"){ return "0326" }
    if(serviceName === "Puerta a puerta 2 días (sin transporte curricular)"){ return "1008" }
    if(serviceName === "Puerta a puerta 3 días (sin transporte curricular)"){ return "1009" }
    if(serviceName === "Puerta a puerta 4 días (sin transporte curricular)"){ return "1010" }

    if(serviceName === "Puerta a puerta 1 día (con transporte curricular)"){ return "1206" }
    if(serviceName === "Puerta a puerta 2 días (con transporte curricular)"){ return "1210" }
    if(serviceName === "Puerta a puerta 3 días (con transporte curricular)"){ return "4017" }
    if(serviceName === "Puerta a puerta 4 días (con transporte curricular)"){ return "1512" }

    if(serviceName === "ECO Refrigerio 1 día semanal")   { return "0111" }
    if(serviceName === "ECO Refrigerio 2 días semanales"){ return "0112" }
    if(serviceName === "ECO Refrigerio 3 días semanales"){ return "0113" }
    if(serviceName === "ECO Refrigerio 4 días semanales"){ return "0114" }

    if(serviceName === "CLUB Refrigerio 3 días semanales"){ return "0115" }
    if(serviceName === "CLUB Refrigerio 5 días semanales"){ return "0116" }

    //////// NA
    if(serviceName === 'Sin transporte')     { return '' }
    if(serviceName === 'Sin donacion')       { return '' }
    if(serviceName === 'Sin anuario')        { return '' }
    if(serviceName === 'Sin refrigerio' )    { return '' }
}

let getTransportServiceName = function(transportValue){
    if(transportValue === 433000){ return "Completo Cercano" }
    if(transportValue === 489000){ return "Completo Intermedio" }
    if(transportValue === 567000){ return "Completo Lejano" }
    if(transportValue === 274000){ return "Medio Cercano" }
    if(transportValue === 292000){ return "Medio Intermedio" }
    if(transportValue === 351000){ return "Medio Lejano" }
    if(transportValue === 0){ return "Sin transporte" }
}

let getEcoTransportServiceName = function(transportValue, type){
    // LINEAL NAMES
    if(transportValue === 48000){ return "Lineal 1 día semanal (sin transporte curricular)" }
    if(transportValue === 96000){ return "Lineal 2 días semanales (sin transporte curricular)" }
    if(transportValue === 144000 && type === "Transporte Lineal"){ return "Lineal 3 días semanales (sin transporte curricular)" }
    if(transportValue === 192000){ return "Lineal 4 días semanales (sin transporte curricular)" }

    // DOOR NAMES WITH CURRICULAR TRANSPORT
    if(transportValue === 58000){ return "Puerta a puerta 1 día (con transporte curricular)" }
    if(transportValue === 116000){ return "Puerta a puerta 2 días (con transporte curricular)" }
    if(transportValue === 158000){ return "Puerta a puerta 3 días (con transporte curricular)" }
    if(transportValue === 200000){ return "Puerta a puerta 4 días (con transporte curricular)" }

    // DOOR NAMES WITHOUT CURRICULAR TRANSPORT
    if(transportValue === 72000){ return "Puerta a puerta 1 día (sin transporte curricular)" }
    if(transportValue === 144000 & type === "Transporte Puerta a Puerta"){ return "Puerta a puerta 2 días (sin transporte curricular)" }
    if(transportValue === 198000){ return "Puerta a puerta 3 días (sin transporte curricular)" }
    if(transportValue === 256000){ return "Puerta a puerta 4 días (sin transporte curricular)" }

    if(transportValue === 0){ return "Sin transporte" }
}

let existTextMatch = function(textBase, textFind){
    if(textBase === undefined){
        return false
    }if(textBase.includes(textFind)){
        return true
    }if(!textBase.includes(textFind)){
        return false
    }
}

let checkSelection = function(value){
    if(value > 0){ return 'Si' }
    else{ return 'No' }
}

let checkNull = function(value){
    return value === null ? 0 : value
}

let getMatriculaName = function(tarifa_plena, tarifa_reducida_7_5, tarifa_reducida_15){
    if(tarifa_plena > 0){ return 'Matricula Plena' }
    if(tarifa_reducida_7_5 > 0){ return 'Matricula 50' }
    if(tarifa_reducida_15 > 0){ return 'Matricula 100' }
}

let getPensionName = function(matriculaCode){
    console.log(matriculaCode)
    if(matriculaCode === "0001"){ return 'Pension Plena' }
    if(matriculaCode === "0002"){ return 'Pension 100' }
    if(matriculaCode === "0003"){ return 'Pension 50' }
}

let getDonacionName = function(value){
    if( value === 30000 ){ return '1 corazon' }
    if( value === 50000 ){ return '2 corazones' }
    if( value === 200000 ){ return '3 corazones' }
    if( value === 300000 ){ return '4 corazones' }
    if( value === 0 ){ return 'Sin donacion' }
}

let getAnuarioName = function(value){
    if( value === 116000 ){ return 'Impreso' }
    if( value === 48000 ){ return 'Digital' }
    if( value === 0 ){ return 'Sin anuario' }
}

let getSnackEcoName = function(value){
    if( value === 25000  ){ return 'ECO Refrigerio 1 día semanal' }
    if( value === 45000  ){ return 'ECO Refrigerio 2 días semanales' }
    if( value === 65000  ){ return 'ECO Refrigerio 3 días semanales' }
    if( value === 85000  ){ return 'ECO Refrigerio 4 días semanales' }
    // CLUB
    if( value === 80000  ){ return 'CLUB Refrigerio 3 días semanales' }
    if( value === 130000 ){ return 'CLUB Refrigerio 5 días semanales' }
    if( value === 0 ){ return 'Sin refrigerio' }
}

let colorPicker = function(value){
    if(value.includes("Eco")){ return '#a8001e' }
    if(value.includes("Club")){ return '#004C98' }
}

let authChecker = function(value){
    return value === "Si" ? true : false
}

let convertToHtml = function(){
    var parser = new DOMParser()
    var htmlDoc = parser.parseFromString('<!doctype html><html><head></head><body><a>Link 1</a><a>Link 2</a></body></html>', 'text/html')
    // do whatever you want with htmlDoc.getElementsByTagName('a');
    let doc = htmlDoc.getElementsByTagName('a')
    return doc
}

let totalServiceWithDiscount = function(value, discount){
    if(discount > 0){
        return Number(value * 0.5)
    }
    if(discount === 0){
        return Number(value)
    }
}

let getServiceDiscount = function(value, discount){
    if(discount > 0){
        return Number(value * 0.5)
    }else{
        return 0
    }
}

module.exports = {
        getServiceCode,
        getTransportServiceName,
        existTextMatch,
        checkSelection,
        checkNull,
        getMatriculaName,
        getPensionName,
        getDonacionName,
        getAnuarioName,
        getEcoTransportServiceName,
        getSnackEcoName,
        colorPicker,
        authChecker,
        convertToHtml,
        totalServiceWithDiscount,
        getServiceDiscount
}