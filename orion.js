"use strict";

var request = require("request");

var util = require("./util");

function fromHTTPToOrionContextBroker (cuerpo,method,orionHost,orionPort,orionPathV2OpUpdate,orionService,orionServicePath) {
    return new Promise(function(resolve, reject) {

        var options = { method: method,
                        url: orionHost+":"+orionPort+orionPathV2OpUpdate,
                        headers: 
                            {   'Cache-Control': 'no-cache',
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                'fiware-service': orionService,
                                'fiware-servicepath': orionServicePath
                            },
                        body: cuerpo
                    };
                   
        request(options, function (error, response, body) {
            
            if (error) { 
                console.log(error + util.unixTime(Date.now()));
                reject(error)    
            }
            else {
                console.log("Petición OK: " + util.unixTime(Date.now()));
                resolve(body);
                reject('');
            }
            
        })
    })
}

//Quita los caracteres no compatibles con JSON de la cadena.
//""","'","(",")",";","<","=",">","\","{","}"
function limpiaCadenaJSON(cadena) {

    var cadenaReplace = cadena

    var resultado = ""

    cadenaReplace = cadenaReplace.replace(String.fromCharCode("[".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("\"".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("'".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("(".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode(")".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode(";".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("<".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("=".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode(">".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("\\".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("{".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("}".charCodeAt(0)), '');
    cadenaReplace = cadenaReplace.replace(String.fromCharCode("]".charCodeAt(0)), '');

    //Recorre la cadena y si encuentra caracteres con ascii no comprendidos entre 32 y 255 ambos inclusive se quitan.
    for (var i = 0; i< cadenaReplace.length; i++) {
        var caracter = cadenaReplace.charAt(i);

        if( caracter.charCodeAt(0) >= 32 && caracter.charCodeAt(0) <= 255) {
            resultado = resultado.concat(caracter);
         }
    }
    return resultado
}

module.exports.limpiaCadenaJSON = limpiaCadenaJSON; 

module.exports.fromHTTPToOrionContextBroker = fromHTTPToOrionContextBroker; 







