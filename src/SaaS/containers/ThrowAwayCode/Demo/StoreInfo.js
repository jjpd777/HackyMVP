/* eslint-disable quotes */


const STORENAME = "LISTOSOFTWARE";

//=====-----=======-------========----========------========
const STORE_LEGAL_NAME = "La Borgoña Panadería";
const STORE_TAX_INFORMATION = "90136616";
const NAME_CODE_ADDRESS = {
    "Listo Software": ["Listo", "1", "\nPlaza Comercial Gerona KM 14.5 Crra. El Salvador\nLote 9 Aldea Puerta Parada\nZ.7 Santa Catarina Pinula\nFraijanes, Guatemala\nGuatemala\n"],
};

// const INDEX_STORENAME = !NAME_CODE_ADDRESS[STORENAME] ? "GERONA" : STORENAME;
//=====-----=======-------========----========------========

// const HEADER_INFO = "\n---DATOS EFACE---\nNIT:" + STORE_TAX_INFORMATION + "\n" + NAME_CODE_ADDRESS[INDEX_STORENAME][2];
// const PURCHASE_RECEIPT_TEXT = "\nConstancia de envío y recibido\nAutorizado en punto de venta " + INDEX_STORENAME;
// const LAST_TAX_DETAIL = "\nSUJETO A PAGOS TRIMESTRALES\nAGENTE RETENEDOR DE IVA";
// const CERTIFIER_INFO = "\nCERTIFICADOR: CYBERESPACIO S.A.\n";



const STOREINFO = () => {
    const storeTaxName = STORE_LEGAL_NAME;
    const storeID = "1";

    const storeInfo = {
        "nombre": "La Borgoña",
        "sede": storeTaxName,
        "numeroSede": storeID,
        "nit": STORE_TAX_INFORMATION
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