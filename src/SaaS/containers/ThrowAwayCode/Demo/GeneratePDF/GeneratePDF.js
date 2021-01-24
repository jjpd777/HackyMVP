import React, { useState, useEffect } from 'react';
import './GeneratePDF.scss';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {
    faClock, faMoneyBillAlt, faCreditCard,faFilePdf, faPhone, faGlasses, faArrowRight, faCheckCircle, faLongArrowAltRight

} from '@fortawesome/free-solid-svg-icons';
import {createPDF }from './UtilsPDF';

import {
    Button,
    FormInput,
    Card,
    CardBody,
} from 'shards-react';

import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import generate from '@babel/generator';

const download = require("downloadjs");


function GeneratePDF(props) {
    const {whatsAppURL, proceedH} = props;
    const [header, setHeader] = useState("");
    const [downloadURL, setDownloadURL] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [proceed, setProceed ] = useState(false);
    const [triggerPDF, setTriggerPDF] = useState(true);

    const craftString = (message) => {
  
        message = message.split("%").join("%25")
        message = message.split("&").join("%26")
        message = message.split("=").join("%3D")
        message = message.split("?").join("%3F")
        message = message.split("#").join("%23")
        message = message.split(":").join("%3A")
        message = message.split("/").join("%2F")
        console.log(message, "MESSAGE")
        return message;
    };

    // useEffect(()=>{
    //     if(pdfFlag) createPDF()
    // },[pdfFlag])

    async function createPDF() {
        const url = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/factura-001204-listosoftware.pdf?alt=media&token=95cfac58-2ae0-41db-9449-f2e186a5ebf1"
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize();

        var baseX = 205;
        var baseY = 339;

        const hourX = baseX + 310;
        const hourY = baseY + 14;

        // firstPage.drawText("10-10-2049", {
        //   x: hourX,
        //   y: height / 2 + hourY,
        //   size: 7,
        //   font: helveticaFont,
        //   color: rgb(0.1, 0.1, 0.1),
        // })
        const pdfBytes = await pdfDoc.save();
        var storageRef = firebase.storage().ref();
        const stringDate = "factura-listosoftware";

        var file2write = storageRef.child(stringDate+'.pdf')
        setIsGenerating(true);
        file2write.put(pdfBytes).then(function (snapshot) {
            file2write.getDownloadURL().then(function (url) {
              setDownloadURL(url);
              setIsGenerating(false);
              setTriggerPDF(false);
            })
        }
            )
    }
    const finalWhatsApp = ()=>{
        const x = craftString(downloadURL)
        console.log(downloadURL)
        console.log("HERE BRUH", x)
        return whatsAppURL + "%0A%0A*PDF DESCARGABLE*%0A%0A" + x;

    }
    const isDownloadable = !isGenerating && downloadURL !== "";

    return (
        <div className="pdf-module">
       { !isGenerating && !isDownloadable && !proceed &&
       <div>
       <h3>Certificación exitosa!</h3>
       <h1><FontAwesomeIcon className="check-success" icon={faCheckCircle}/></h1>
        {!proceed && <Button onClick={()=>{setProceed(true); proceedH(true)}} theme="success" className="create-pdf"> 
           Siguiente paso  <FontAwesomeIcon icon={faLongArrowAltRight}/>
        </Button>}
        </div>
        }
          {/* {isGenerating && <Button onClick={()=>createPDF()} theme="success" className="create-pdf"> 
           Cargando...  <FontAwesomeIcon icon={faFilePdf}/>
        </Button>} */}
        {/* {isGenerating && <Button className="waiting-pdf"> <FontAwesomeIcon icon={faClock}/>  <FontAwesomeIcon icon={faFilePdf}/>
         Generando PDF</Button> } */}
       { proceed && 
       <div className="final-options">
       <h5> Siguientes pasos</h5>
            <Card>
                <CardBody className="body">
                {triggerPDF && !isGenerating && <Button className="download-pdf" onClick={()=> createPDF()}> Generar PDF <FontAwesomeIcon icon={faFilePdf}/></Button>}
                {isGenerating && <Button className="download-pdf" onClick={()=> {}}> Generarando... <FontAwesomeIcon icon={faFilePdf}/></Button>}
                {!triggerPDF && <Button className="download-pdf" href={downloadURL}> Descargar PDF <FontAwesomeIcon icon={faFilePdf}/></Button>}

                {<Button className="whatsapp-message" href={finalWhatsApp()}> WhatsApp <FontAwesomeIcon icon={faPhone}/></Button>}
                </CardBody>
            </Card>
        </div>}
        </div>
    )
}
export default GeneratePDF;