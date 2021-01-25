
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import firebase from 'firebase';
import {DateUtils} from '../../Database/DatabaseFunctions';


const SUB_HEADERS = ()=>{
  const STORE_HEADERS = ["Nomber de emisor:","NIT del emisor:", 
                "Fecha y hora de emisión:","Dirección del emisor:"]
  const CONSUMER_HEADERS = ["Nombre receptor:","NIT del receptor",
                            "Dirección del receptor:"]

  const TAX_HEADERS = ["Monto total:","Producto ó servicio vendido:", 
                        "Número de serie:", "Número confirmación","Autorización:"]

  return [STORE_HEADERS, CONSUMER_HEADERS,TAX_HEADERS];
}

const INPUT_FIELDS = (A,B, issuedTimestamp)=>{
  const {TIMESTAMP_GENERATOR} = DateUtils();
    const STORE_FIELDS = ["Listo Software","46398279", issuedTimestamp
    ,"Ofibodegas Jade, Carretera a El Salvador"]
    const CUSTOMER_FIELDS = A;
    const RESPONSE = B;
    
    return [STORE_FIELDS, CUSTOMER_FIELDS, RESPONSE];
  }

export const prepare2WritePDF = async(props)=>{
    const [CUSTOMER_FIELDS,SAT_RESPONSE, issuedTimestamp] = props;
    const url = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/mvp-receipt-template.pdf?alt=media&token=4cf4c618-3c3f-46d2-b979-aa55acbd49cc"
    const {TIMESTAMP_GENERATOR} = DateUtils();
    
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const HEADERS = SUB_HEADERS(issuedTimestamp);
        const FIELDS = INPUT_FIELDS(CUSTOMER_FIELDS,SAT_RESPONSE, issuedTimestamp);

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize();


        const hourX =  70;
        const hourY = 353;

        firstPage.drawText(TIMESTAMP_GENERATOR().split("&").join(" "), {
          x: hourX,
          y: height / 2 + hourY,
          size: 12,
          font: helveticaFont,
          color: rgb(0.1, 0.1, 0.1),
        })
       
        var startingY =( height / 2 + hourY)-200 ;
        HEADERS[0].map((x, ix)=>{
          firstPage.drawText(x, {
            x: hourX +( ix%2===0 ? 0 : 200),
            y: startingY ,
            size: 12,
            font: helveticaFont,
            color: rgb(255/255,140/255,0),
          })
          firstPage.drawText(FIELDS[0][ix], {
            x: hourX + (ix%2===0 ? 0 : 200),
            y: startingY-15 ,
            size: 14,
            font: helveticaFont,
            color: rgb(0.1,0.1,0.1),
          })   
          startingY-= (ix%2 !==0 ? 50 :0);
        })

        startingY -=50;

        HEADERS[1].map((x, ix)=>{
          const xCoordinate = hourX + (ix%2===0 ? 0 : 200);
          firstPage.drawText(x, {
            x: xCoordinate,
            y: startingY ,
            size: 12,
            font: helveticaFont,
            color: rgb(255/255,140/255,0),
          })
          firstPage.drawText(FIELDS[1][ix], {
            x: xCoordinate,
            y: startingY-15 ,
            size: 14,
            font: helveticaFont,
            color: rgb(0.1,0.1,0.1),
          })  
          startingY-= (ix%2 !==0  ? 50 :0);
        })

        startingY -=50;

        HEADERS[2].map((x, ix)=>{
          firstPage.drawText(x, {
            x: hourX + (ix%2===0 ? 0 : 200),
            y: startingY ,
            size: 12,
            font: helveticaFont,
            color: rgb(255/255,140/255,0),
          })
          firstPage.drawText(FIELDS[2][ix], {
            x: hourX + (ix%2===0 ? 0 : 200),
            y: startingY-15 ,
            size: 14,
            font: helveticaFont,
            color: rgb(0.1,0.1,0.1),
          })  
          startingY-= (ix%2 !==0  ? 50 :0);
        })

        const pdfBytes = await pdfDoc.save();

      return pdfBytes;
}