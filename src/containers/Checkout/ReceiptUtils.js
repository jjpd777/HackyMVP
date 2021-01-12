
import StoreInfo from './StoreInfo';
import {newMHDMY} from '../../services/DBservice';

  
  const craftString = (message) => {
    var hashtag = /#/gi;
    message = message.replace(hashtag, "%23")
    message = message.replace(":", "%3A")
    message = message.replace(hashtag, "%20")
    return message;
  }

  const baseURLCrafter =(num)=>{
    return "https://wa.me/502"+num+ "?text="
  };
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
};

  const STORE_TAX_INFORMATION = "123456789";
  const STORE_ADDRESS = "*Dirección de empresa:*%0AOfibodegas Jade, Km 17.5 Carretera a El Salvador"
  // const confirmationNum = "AH-43491-4335-222098";
  // const authorizationNum = "3948958q398439859587a0fm09349";
  // const seriesNum = "779-Z0-13";
  const STORENAME = "Listo Software"

const storeInfoHeader = (confirmationNum, authorizationNum, seriesNum, nit)=>{
  const STORE_INFO = "%0A*NIT de empresa* (emisor):%0A" + STORE_TAX_INFORMATION ;
  const TIMESTAMP = "*Fecha y hora de emisión:*%0A" + newMHDMY().split('&').join(' ')+"%0A";
    var HEADER_INFO = "*DOCUMENTO TRIBUTARIO ELECTRÓNICO*%0A%0A- - - *DATOS EFACE* - - -%0A*Empresa:*%0ALISTO SOFTWARE%0A";
    HEADER_INFO = HEADER_INFO+ TIMESTAMP+ STORE_ADDRESS + STORE_INFO+ "%0A- - - %0A";
    const TAX_SUBHEADER = "%0A%0A- - - *DATOS FACTURA* - - -%0A*NIT Consumidor* (receptor): " + nit +"%0A";
    const TAXINFO = TAX_SUBHEADER+ "*No. Confirmación:*%0A"+ String(confirmationNum) + "%0A*Autorización::* " + authorizationNum + "%0A*Número de serie:*%0A" + seriesNum;
    const response = HEADER_INFO+TAXINFO + "%0A- - - %0A%0A";
    return response;
  };

const customerInfoHandler = (name,consumption, total, nit, address)=>{
    const fixName = name==='Anónimo' ? "cliente" : name;
    const INITIAL_BUFFER = "- - *FACTURA CERTIFICADA EXITOSAMENTE* - -"
    const CUSTOMER_STRING =INITIAL_BUFFER+ "%0A%0AEstimado " + fixName ;
    const PURCHASE_STRING = ", su consumo por " + consumption +" en " + STORENAME+ " es un total de *Qt.z" + total+ '*.%20';
    const TAX_STRING =  "La factura fué emitida al NIT *"+nit+"*, con dirección "+ address +".%0A";
    const THANKS_STRING="%0AGracias por su compra!%0A%0A: :: :.: :: :: : : .: : .:. :%0A%0A";
    return CUSTOMER_STRING+ PURCHASE_STRING+TAX_STRING+THANKS_STRING;
}

const goodbyHandler = ()=>{
  const part2 = "%0A==> Agente retenedor de IVA<==%0A==>Sujeto a pagos trimestrales<==%0A";
  const part3 = "*Certifiado por Cyberespacio S.A.*"
  const part4 = "%0A%0AFacturación electrónica para los *Listos*."
  const part5 = "%0APara más información:%0Ahttps://www.listosoftware.com/"
  return part2+part3+part4+part5;
}

const purchaseJson = (consumedGoods, total) => {
    var processing = {};
    // processing[consumedGoods] = {
    //   "precio": total,
    //         "unidades": 1,
    //         "PoS": "B",
    // }
     processing["pan"] = {
      "precio": 1,
            "unidades": 1,
            "PoS": "B",
    }

    return processing;
};

export async function request2API(body) {
  const rsp = fetch('https://vrit6y3xga.execute-api.us-east-2.amazonaws.com/v1/fact1', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
  }).then(response => response.json());
  return rsp;

};
export const parseAPIresponse = (data)=>{
  var response = [];
  const rsp = data.body.success;
  if (rsp) {
    const authorization = rsp['Autorizacion'];
    const serialNum = rsp['Serie'];
    const confirmationNum = rsp['NUMERO'];

    response.push(authorization);
    response.push(serialNum);
    response.push(confirmationNum);
  } else {
    response.push(["Pendiente","Pendiente / No autorizado", "Pendiente"]);
  }
  return response;

}

export const buildAPIcall = (payMethod, customerName, nit, consumedGoods, total) => {
    const verifiedNIT = nitIsValid(nit) ? nit : 'CF';
    var response = {
        "infoConsumidor": {
            "nombre": customerName,
            "pago": payMethod,
            "factura": {
                "Nit": verifiedNIT,
                "email": "compuetc@gmail.com",
                "departamento": "Sacatepequez",
                "municipio": "Jocotenango",
                "codigo postal": "1010",
                "direccion": "13 calle 1-53 los llanos",
                "telefono": "42007503"
            },
        },
    };
    response["infoTienda"] = StoreInfo.STOREINFO();
    response["Transaccion"] = StoreInfo.TRANSACTIONINFO();
    response["compra"] = purchaseJson(consumedGoods, total);

    return response;
};

export const callAPI4Receipt = ( receiptUtils, taxDetail) => {
    const [ name,consumption, total, nit, address, phoneNum]= receiptUtils;
    const [authorizationNum,seriesNum, confirmationNum] = taxDetail;
    const CUSTOMER_INFO = customerInfoHandler( name,consumption, total, nit, address)
    const HEADER_INFO =  storeInfoHeader(confirmationNum, authorizationNum, seriesNum, nit);
    const GOODBYE_INFO = goodbyHandler();
    const ASSEMBLE_RESP = craftString(CUSTOMER_INFO) + craftString(HEADER_INFO) +craftString(GOODBYE_INFO);
    var baseURL = baseURLCrafter(phoneNum);
    const response = baseURL+ ASSEMBLE_RESP;
    return response;
  };

