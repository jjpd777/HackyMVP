/* eslint-disable quotes */


const STORENAME = "LISTOSOFTWARE";
const STORE_LEGAL_NAME = "La Borgoña Panadería";
const STORE_TAX_INFORMATION = "90136616";

const CUSTOMERS_TEXT = {
    "galdamez": {
		"nombre": "Lic. Rodolfo Enrique Galdámez",
		"sede": "Lic. Rodolfo Enrique Galdámez",
		"numeroSede": "1",
        "nit": "5555108",
        "numeroInterno": "",
		"serie": "Z",
    }
}

const CUSTOMERS_DICTIONARY = {
    "galdamez": {
		"nombre": "Lic. Rodolfo Enrique Galdámez",
		"sede": "Lic. Rodolfo Enrique Galdámez",
		"numeroSede": "1",
        "nit": "5555108",
        "numeroInterno": "",
		"serie": "Z",
    },
    "demo": {
		"nombre": "Fusión Ingeniería",
		"sede": "Fusión Ingeniería",
		"numeroSede": "1",
        "nit": "46398279",
        "numeroInterno": "",
		"serie": "Z",
    },
}
export const STORE_LEGAL_INFO = (k)=>{
        return CUSTOMERS_DICTIONARY[k];
}
//=====-----=======-------========----========------========

const NAME_CODE_ADDRESS = {
    "Listo Software": ["Listo", "1", "\nPlaza Comercial Gerona KM 14.5 Crra. El Salvador\nLote 9 Aldea Puerta Parada\nZ.7 Santa Catarina Pinula\nFraijanes, Guatemala\nGuatemala\n"],
};




export const STOREINFO = (k) => {
    var ts = Math.round((new Date()).getTime() / 1000);

    var storeInfo = CUSTOMERS_DICTIONARY[k];
    storeInfo.numeroInterno= ts;

    return storeInfo;
};
const TRANSACTIONINFO = ()=> {
    const resp = {
    "tipoaccion": "certificacion",
    "tipodoc": "factura",
};
return resp;
};



export default {STOREINFO, TRANSACTIONINFO};