import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput,
    Card,
    CardBody,
} from 'shards-react';
import CardTemplate from './CardTemplate';
import { faCheckCircle, faBook, faCreditCard, faArrowLeft,
    faGlasses, faMoneyBillAlt,faPhoneSquare,
    faFileExcel,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './CardCollection.scss';

function CardCollection(props){
    const {navHelper} = props;

    return(
<>
<Button className="go-back" onClick={()=>navHelper("")}> <FontAwesomeIcon icon={faArrowLeft}/>Regresar </Button>

    <CardTemplate/>
    <CardTemplate/>
    <CardTemplate/>
</>

    )
}

export default CardCollection;