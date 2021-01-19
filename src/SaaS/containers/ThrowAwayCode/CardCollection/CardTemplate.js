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
    faLocationArrow, faMoneyBillAlt, faCreditCard, faFilePdf, faPhoneSquare
    , faDownload, faForward, faCheck, faCheckCircle

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function CardTemplate(){
    const [showFlag, setShowFlag] = useState(false);
    return(
    <>
    <div onClick={()=> setShowFlag(!showFlag)}className="individual-card">
    <Card>
        <CardBody>
        <Button className="highlight" theme="warning">
            <h4><b>Qtz.</b>500
            <FontAwesomeIcon className="status" icon={faCheckCircle}/>
            </h4>
        </Button>
        <h5>con tarjeta</h5>
        <div className="timestamp">
        <h5>19:23 el 17 Enero</h5>
        
        </div>
        {/* <h6>no Autorización:</h6>
        <p>"FEF7D62F-0257-4D32-885F-EDC7AB1595A1"</p>
        <h6>no Serie:</h6>
        <p>FEF7D62F</p> */}
       
        </CardBody>
        <CardFooter>
        <h6>Receptor: Juan José</h6>
        <h6><b>NIT:</b> 32872147</h6>
        </CardFooter>
    </Card>
    </div>
    {showFlag &&
    <div className="pop-up-btn">
        <Button className="wzp"> Reenviar <FontAwesomeIcon icon={faPhoneSquare}/></Button> 
        <Button className="pdf"> <FontAwesomeIcon icon={faDownload}/> <FontAwesomeIcon icon={faFilePdf}/></Button>
    </div>}
    </>

    )
}

export default CardTemplate;