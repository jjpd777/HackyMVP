import React, { useState, useEffect } from 'react';
import './FinalTaxSegment.scss';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {
    faClock, faMoneyBillAlt, faCreditCard,faFilePdf, faPhone, faGlasses, faArrowRight, faCheckCircle, faLongArrowAltRight

} from '@fortawesome/free-solid-svg-icons';
import {createPDF }from '../SpecialHelpers/GeneratePDF/UtilsPDF';
import {prepare2WritePDF} from '../SpecialHelpers/GeneratePDF/BuildPDF';
import {DateUtils} from '../Database/DatabaseFunctions'

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


function FinalTaxSegment(props) {
    const {whatsAppURL, proceedH, pdfProps} = props;
    const [header, setHeader] = useState("");
    const [downloadURL, setDownloadURL] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [proceed, setProceed ] = useState(false);
    const [triggerPDF, setTriggerPDF] = useState(true);

    
    console.log(pdfProps)
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

    async function fetchAndCreatePDF() {
        const [CUSTOMER_FIELDS,SAT_RESPONSE] = pdfProps;
        const {TIMESTAMP_GENERATOR} = DateUtils();
        const tstamp = TIMESTAMP_GENERATOR().split('&')[1];

        const PDF_PROPS = [CUSTOMER_FIELDS,SAT_RESPONSE, tstamp]


        const pdfBytes = await prepare2WritePDF(PDF_PROPS);
        var storageRef = firebase.storage().ref();
        const stringDate =  tstamp + "-factura-listosoftware";
        setIsGenerating(true);
        var file2write = storageRef.child(stringDate+'.pdf')
        file2write.put(pdfBytes).then( function (snapshot) {
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

       { proceed && 
       <div className="final-options">
       <h5> Siguientes pasos</h5>
            <Card>
                <CardBody className="body">
                {triggerPDF && !isGenerating && <Button className="download-pdf" onClick={()=> fetchAndCreatePDF()}> Generar PDF <FontAwesomeIcon icon={faFilePdf}/></Button>}
                {isGenerating && <Button className="download-pdf" onClick={()=> {}}> Generarando... <FontAwesomeIcon icon={faFilePdf}/></Button>}
                {!triggerPDF && <Button className="download-pdf" href={downloadURL}> Descargar PDF <FontAwesomeIcon icon={faFilePdf}/></Button>}

                {<Button className="whatsapp-message" href={finalWhatsApp()}> WhatsApp <FontAwesomeIcon icon={faPhone}/></Button>}
                </CardBody>
            </Card>
        </div>}
        </div>
    )
}
export default FinalTaxSegment;