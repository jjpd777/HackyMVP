
import React from 'react';
import DBservice from "../services/DBservice"
const STOREINFO = {
    "infoTienda": {
        "nombre": "La Borgoña",
        "sede": "Gerona",
        "numeroSede": "123",
        "nit": "3444666"
    }
}
const TRANSACTIONINFO = {
    "Transaccion": {
        "tipoaccion": "certificacion",
        "tipodoc": "factura"
    }
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


const buildAPIcall = (customerName, payMethod, NIT, address, purchase) => {
    var response = {
        "infoConsumidor": {
            "nombre": customerName,
            "pago": payMethod,
            "factura": {
                "nit": NIT,
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
    response["compra"] = purchase;

    return response
}

const purchaseJson = (purchaseItems) => {
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
const generate = (defaultOption, receiptInfo, purchaseItems) => {
    var { name, paymentMethod, taxString, address, time, order } = receiptInfo;

    const purchase = purchaseJson(order);
    var verifiedTax = nitIsValid(taxString) ? taxString : "CF";
    var object4API = buildAPIcall(name, paymentMethod, verifiedTax, address, purchase);
    object4API["ticketType"] = defaultOption ? "salesProof" : "taxVerified";
    object4API["timestamp"] = time;
    object4API["valid"] = true;

    if (defaultOption) {
        // Append empty SAT
        object4API["SAT"] = "notApplicable";

    } else {
        // Make API call to certify
        // Append SAT response
        const responseAPI = {};
        object4API["SAT"] = responseAPI;
    }
    // store information in database
    // asign it a unique ID
    // Create PDF
    // print purchase proof ticket and done



}

export default { generate };

