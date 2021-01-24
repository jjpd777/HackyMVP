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
    const customer = receiptInfo.purchaseSummary;
    const name = customer.name;
    const payMethod = customer.paymentMethod;
    const taxInfo = customer.taxInfo;
    const total = customer.total;
    const tstamp = receiptInfo.timestamp;
    const whatsAppURL = receiptInfo.whatsAppURL;
    const [pdfURL, setPDF] = useState("");
    const [pdfLoading, setPDFLoading] = useState(false);

    async function fetchAndCreatePDF () {
       
    
        const {TIMESTAMP_GENERATOR} = DateUtils();
        const props = TIMESTAMP_GENERATOR();

        const pdfBytes = await prepare2WritePDF(props);
        var storageRef = firebase.storage().ref();
        const stringDate = "factura-listosoftware";
        setPDFLoading(true);
        var file2write = storageRef.child(stringDate+'.pdf')
        file2write.put(pdfBytes).then( async function (snapshot) {
             file2write.getDownloadURL().then(function (url) {
                setPDF(url);
                setPDFLoading(false)
            })
        }
            )
    
    }


    useEffect(()=>{
        console.log("EVENTUALLY", pdfURL)

    },[pdfURL])

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