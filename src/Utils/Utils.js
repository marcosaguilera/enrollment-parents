let getServiceCode =  function(serviceName){
    //////// Annual services
    if(serviceName === 'Matricula'){ return 'A8001' }
    if(serviceName === 'Bibliobanco'){ return 'A8001' }
    if(serviceName === 'Seguro accidentes'){ return 'A8001' }
    if(serviceName === 'Asopadres'){ return 'A8001' }
    if(serviceName === 'Club deportivo'){ return 'A8001' }
    if(serviceName === 'Impreso - $110.000'){ return 'A8001' }
    if(serviceName === 'Digital - $46.000'){ return 'A8001' }
    if(serviceName === 'Impreso y digital - $156.000'){ return 'A8001' }

    //////// Montly services
    if(serviceName === 'Pension'){ return 'P9001' }
    if(serviceName === 'Transporte'){ return 'T9002' }
    if(serviceName === 'Almuerzo'){ return 'A9003' }
    if(serviceName === 'Medias Nueves'){ return 'M9004' }
    if(serviceName === 'Desayuno'){ return 'D9005' }
    if(serviceName === 'Seguro de vida'){ return 'S9006' }
    if(serviceName === 'Seguro desempleo'){ return 'S9007' }
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

module.exports = {
    getServiceCode,
    getTransportServiceName,
    existTextMatch,
    checkSelection
}