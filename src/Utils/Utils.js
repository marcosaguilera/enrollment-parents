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

    //////// NA
    if(serviceName === 'Sin transporte')     { return '' }
    if(serviceName === 'Sin donacion')       { return '' }
    if(serviceName === 'Sin anuario')        { return '' }
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

module.exports = {
    getServiceCode,
    getTransportServiceName,
    existTextMatch,
    checkSelection,
    checkNull,
    getMatriculaName,
    getPensionName,
    getDonacionName,
    getAnuarioName
}