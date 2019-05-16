let getServiceCode =  function(serviceName){
    //////// Annual services
    if(serviceName === 'Matricula Plena'){ return '0001' }
    if(serviceName === 'Matricula 50'){ return '0003' }
    if(serviceName === 'Matricula 100'){ return '0002' }
    if(serviceName === 'Bibliobanco'){ return '0005' }
    if(serviceName === 'Seguro accidentes'){ return '0008' }
    if(serviceName === 'Asopadres'){ return '0010' }
    if(serviceName === 'Club deportivo'){ return '0200' }
    if(serviceName === 'Impreso - $110.000'){ return '0007' }
    if(serviceName === 'Digital - $46.000'){ return '0006' }
    if(serviceName === 'Impreso y digital - $156.000'){ return 'XXXX' }

    //////// Montly services
    if(serviceName === 'Pension Plena'){ return '0020' }
    if(serviceName === 'Pension 50'){ return '0022' }
    if(serviceName === 'Pension 100'){ return '0021' }
    if(serviceName === 'Transporte Completo Cercano'){ return '0026' }
    if(serviceName === 'Transporte Completo Intermedio'){ return '0027' }
    if(serviceName === 'Transporte Completo Lejano'){ return '0028' }
    if(serviceName === 'Transporte Medio Lejano'){ return '0031' }
    if(serviceName === 'Transporte Medio Intermedio'){ return '0030' }
    if(serviceName === 'Transporte Medio Cercano'){ return '0029' }
    if(serviceName === 'Almuerzo'){ return '0024' }
    if(serviceName === 'Medias Nueves'){ return '0025' }
    if(serviceName === 'Desayuno'){ return '0098' }
    if(serviceName === 'Seguro de vida'){ return '0032' }
    if(serviceName === 'Seguro desempleo'){ return '0092' }
    if(serviceName === 'Otro'){ return 'O9008' }
}

let getTransportServiceName = function(transportValue){
    if(transportValue === 409000){ return "Completo Cercano" }
    if(transportValue === 462000){ return "Completo Intermedio" }
    if(transportValue === 536000){ return "Completo Lejano" }
    if(transportValue === 259000){ return "Medio Cercano" }
    if(transportValue === 276000){ return "Medio Intermedio" }
    if(transportValue === 332000){ return "Medio Lejano" }
    if(transportValue === 0){ return "Sin servicion" }
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

module.exports = {
    getServiceCode,
    getTransportServiceName,
    existTextMatch,
    checkSelection,
    checkNull,
    getMatriculaName,
    getPensionName
}