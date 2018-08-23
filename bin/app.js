"use strict";

var config = require("../config.json");
var orion = require("../orion");
var util = require("../util");

async function lanzaProceso(orionEntity_type,orionMethodPOST,orionHost,orionPort,orionPathV2OpUpdate,orionActionType,orionService,orionServicePath) {
    try {

        var cuerpo = [];
        var respuestaOrion

        var fechaUniX = Date.now()
        var fechaFormateada = util.unixTime(Date.now())

        console.log("Empieza proceso")

        console.log("fechaUniX: " + fechaUniX)
        console.log("fechaFormateada: " + fechaFormateada)

        cuerpo.push({
                    type: orionEntity_type,
                    id: "Jenkins:Prueba",
                    "fechaUniX": {
                        "value": fechaUniX,
                        "type": "Number"
                        },
                    "fechaFormateada": {
                        "value": orion.limpiaCadenaJSON(fechaFormateada.toString()),
                        "type": "string"
                    }
        });

        console.log("cuerpo: "+ cuerpo)

/*
        var strjson = JSON.stringify({
            entities: cuerpo,
            actionType: orionActionType
        });

        respuestaOrion = await orion.fromHTTPToOrionContextBroker(strjson,orionMethodPOST,orionHost,orionPort,orionPathV2OpUpdate,orionService,orionServicePath);

        if (respuestaOrion.length !=0 ) {
            console.log(respuestaOrion + util.unixTime(Date.now()))    
        }
*/

        console.log("Fin proceso")
    } catch(e) {
        console.log(e + util.unixTime(Date.now()))
    }
}

lanzaProceso (config.orionEntity_type,config.orionMethodPOST,config.orionHost,config.orionPort,config.orionPathV2OpUpdate,
              config.orionActionType,config.orionService, config.orionServicePath)