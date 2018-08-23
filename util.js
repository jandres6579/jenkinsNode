"use strict";

//Convierte formato de fecha UNIX a cadena de caracteres en el formato de fecha.
function unixTime(unixDate) {

    var date = new Date(parseInt(unixDate));
  
    //MOSTRAR LA HORA LOCAL
    var cadena1 = date.getFullYear() + '-' +
    ('0' + (parseInt(date.getMonth())+1).toString()).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2)
  
    return cadena1
  };
  
  module.exports.unixTime = unixTime; 
