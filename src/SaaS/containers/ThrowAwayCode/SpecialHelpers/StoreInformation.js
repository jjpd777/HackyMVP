/* eslint-disable quotes */


const STORENAME = "LISTOSOFTWARE";

//=====-----=======-------========----========------========
const STORE_LEGAL_NAME = "La Borgoña Panadería";
const STORE_TAX_INFORMATION = "90136616";
const NAME_CODE_ADDRESS = {
    "Listo Software": ["Listo", "1", "\nPlaza Comercial Gerona KM 14.5 Crra. El Salvador\nLote 9 Aldea Puerta Parada\nZ.7 Santa Catarina Pinula\nFraijanes, Guatemala\nGuatemala\n"],
};




const STOREINFO = () => {
    const storeTaxName = STORE_LEGAL_NAME;
    const storeID = "1";

    const storeInfo = {
        "nombre": "La Borgoña",
        "sede": storeTaxName,
        "numeroSede": storeID,
        "nit": STORE_TAX_INFORMATION,
        "direccion" :"",
        "numeroInterno": "",
        "serie":"ZZZ"

    };
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