
import React from 'react';


const STOREINFO = {
        "nombre": "La Borgoña",
        "sede": "Gerona",
        "numeroSede": "123",
        "nit": "3444666"
}
const TRANSACTIONINFO = {
        "tipoaccion": "certificacion",
        "tipodoc": "factura"
}
function nitIsValid(nit) {
    if (!nit) {
        return true;
    }

    var nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');

    if (!nitRegExp.test(nit)) {
        return false;
    }

    nit = nit.replace(/-/, '');
    var lastChar = nit.length - 1;
    var number = nit.substring(0, lastChar);
    var expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

    var factor = number.length + 1;
    var total = 0;

    for (var i = 0; i < number.length; i++) {
        var character = number.substring(i, i + 1);
        var digit = parseInt(character, 10);

        total += (digit * factor);
        factor = factor - 1;
    }

    var modulus = (11 - (total % 11)) % 11;
    var computedChecker = (modulus == 10 ? "k" : modulus.toString());

    return expectedCheker === computedChecker;
}

const DEMORESPONSE =
{
    "statusCode": 200,
    "body": {
        "success": {
            "Codigo": 1,
            "Mensaje": "Documento Certificado Exitosamente!",
            "AcuseReciboSAT": "",
            "CodigosSAT": "Acuse de RECIBO PENDIENTE",
            "ResponseDATA1": "PD94bWwgdmVyc2lvVudG8+",
            "ResponseDATA2": "",
            "ResponseDATA3": "",
            "Autorizacion": "24DA5FC3-4D28-4044-9548-91A8D6DF04DD",
            "Serie": "24DA5FC3",
            "NUMERO": "1294483524",
            "Fecha_DTE": "2020-11-23T17:41:27",
            "NIT_EFACE": "000029808952",
            "NOMBRE_EFACE": "Sistemas Evolutivos, S.A.",
            "NIT_COMPRADOR": "123456789",
            "NOMBRE_COMPRADOR": "Juan José Palacio",
            "BACKPROCESOR": "BACK02"
        }
    }
};
const buildAPIcall = (customerName, payMethod, nit, address, purchase) => {
    var response = {
        "infoConsumidor": {
            "nombre": customerName,
            "pago": payMethod,
            "factura": {
                "nit": nit,
                "email": "juanjosepalacio@ingetelca.gt",
                "departamento": "Guatemala",
                "municipio": "Guatemala",
                "código postal": "01001",
                "direccion": address,
                "telefono": " 42007503"
            }
        }
    }
    response["infoTienda"] = STOREINFO;
    response["Transaccion"] = TRANSACTIONINFO;
    response["compra"] = purchaseJson(purchase);

    return response
}

const purchaseJson = (purchaseItems) => {
    console.log(purchaseItems)
    var processing = {};
    purchaseItems.map((item) => {
        processing[item.name] = {
            "precio": item.price,
            "unidades": item.quantity,
            "PoS": "B"
        }
    })
    return processing
}


// Default is cash and C.F.
const generate = (defaultOption, receiptInfo) => {
    var [name, payMethod, taxString, address, time,order] = receiptInfo;

    var verifiedTax = nitIsValid(taxString) ? taxString : "CF";
    var object4API = buildAPIcall(name, payMethod, verifiedTax, address, order);

    var newSale = {};

    if (defaultOption) {
        // Append empty SAT
        newSale["SATresponse"] = "notApplicable";

    } else {
        // Make API call to certify
        // Append SAT response
        const apiResponse = DEMORESPONSE;
        const appendResponse = {};
        appendResponse["status"] = apiResponse["statusCode"];
        appendResponse["response"] = apiResponse["body"];
        newSale["SATresponse"] = appendResponse;
    };

    newSale["request"] = object4API;
    newSale["ticketType"] = defaultOption ? "salesProof" : "taxVerified";
    newSale["timestamp"] = time;
    newSale["valid"] = true;


    // store information in database
    // asign it a unique ID
    // Create PDF
    // print purchase proof ticket and done



}

export default { generate };
