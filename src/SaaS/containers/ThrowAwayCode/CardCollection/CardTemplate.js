import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput,
    Card,
    CardBody,
    CardFooter
} from 'shards-react';
import './CardTemplate.scss';
import {
 faCheckCircle, faPhoneSquare, faDownload, faFilePdf, faClock

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import GeneratePDF from '../../../../LandingPage/Demo/GeneratePDF/GeneratePDF';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import firebase from 'firebase';
import {DateUtils} from '../Database/DatabaseFunctions';
import {prepare2WritePDF} from '../SpecialHelpers/GeneratePDF/BuildPDF';

function CardTemplate(props){
    const {receiptInfo} = props;
    const customer = receiptInfo.purchaseSummary; const name = customer.name;
    const payMethod = customer.paymentMethod; const consumption = customer.consumption;
    const taxInfo = customer.taxInfo; const whatsAppURL = receiptInfo.whatsAppURL;
    const total = customer.total; const tstamp = receiptInfo.timestamp;

    const responseSAT = receiptInfo.infoCall2SAT.res.body.success;
    const authNum = responseSAT.Autorizacion; const seriesNum = responseSAT.Serie;
    const verifyNum = responseSAT.NUMERO;
    const address = customer.address ? customer.address : "Ciudad de Guatemala";

    const issuedTimestamp = receiptInfo.timestamp.split("&").join(" ");

    const [pdfURL, setPDF] = useState(""); 
    const [pdfLoading, setPDFLoading] = useState(false);
    const CUSTOMER_FIELDS = [name, taxInfo,address]
    const SAT_RESPONSE = ["Qtz."+String(total),consumption, seriesNum, verifyNum, authNum];
    

    async function fetchAndCreatePDF () {
       
        const PDF_PROPS = [CUSTOMER_FIELDS,SAT_RESPONSE, issuedTimestamp]

        const {TIMESTAMP_GENERATOR} = DateUtils();
        const tstamp = TIMESTAMP_GENERATOR().split('&')[1];

        const pdfBytes = await prepare2WritePDF(PDF_PROPS);
        var storageRef = firebase.storage().ref();
        const stringDate =  tstamp + "-factura-listosoftware";
        setPDFLoading(true);
        var file2write = storageRef.child(stringDate+'.pdf')
        file2write.put(pdfBytes).then( function (snapshot) {
             file2write.getDownloadURL().then(function (url) {
                setPDF(url);
                setPDFLoading(false)
            })
        }
            )
    
    }

    const [showFlag, setShowFlag] = useState(false);

    const downloadReady = pdfURL !== "";
    return(
    <>
    <div onClick={()=> setShowFlag(!showFlag)}className="individual-card">
    <Card onClick={()=> setShowFlag(!showFlag)} >
        <CardBody>
        <Button className="highlight" theme="warning">
            <h4><b>Qtz.</b>{total}
            <FontAwesomeIcon className="status" icon={faCheckCircle}/>
            </h4>
        </Button>
        <h5>con {payMethod}</h5>
        <div className="timestamp">
        <h5>{tstamp.split("&").join(" ")}</h5>
        
        </div>
        {/* <h6>no Autorización:</h6>
        <p>"FEF7D62F-0257-4D32-885F-EDC7AB1595A1"</p>
        <h6>no Serie:</h6>
        <p>FEF7D62F</p> */}
       
        </CardBody>
        <CardFooter>
        <h6>Receptor: {name}</h6>
        <h6><b>NIT:</b> {taxInfo}</h6>
        </CardFooter>
    </Card>
    </div>
    {showFlag &&
    <div className="pop-up-btn">
        <Button href={whatsAppURL} className="wzp"> Reenviar <FontAwesomeIcon icon={faPhoneSquare}/></Button> 
        {!downloadReady && !pdfLoading && <Button onClick={()=>fetchAndCreatePDF()} className="pdf"> <FontAwesomeIcon icon={faDownload}/> <FontAwesomeIcon icon={faFilePdf}/></Button>}
        { pdfLoading && <Button className="pdf"> Cargando <FontAwesomeIcon icon={faClock}/> </Button>}
        {downloadReady && !pdfLoading && <Button href={pdfURL} className="pdf"> <FontAwesomeIcon icon={faDownload}/> <FontAwesomeIcon icon={faFilePdf}/></Button>}
    </div>}
    </>

    )
}

export default CardTemplate;