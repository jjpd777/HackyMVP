import React, { useState } from "react";
import {
    FormTextarea,
    InputGroup,
    InputGroupAddon,
    FormInput,
    InputGroupText,
    Button,
    Card,
    CardBody,
    CardTitle,
} from 'shards-react';
import {
   
} from 'shards-react';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import './Excell.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBook, faCreditCard, 
    faGlasses, faMoneyBillAlt,
    faFileExcel
} from "@fortawesome/free-solid-svg-icons";

function Excell (){

    return(
        <>
        <div className="report-card">
            <Card>
                <CardBody>
                    <CardTitle>
                        <h3>Resumen <FontAwesomeIcon icon={faGlasses}/></h3>
                    </CardTitle>
                    <h4>Enero 2021</h4>
                <h5><b>15</b> facturas en enero</h5>
                <h5><b>2 </b>facturas canceladas</h5>
                <h2>- - -</h2>
                <h5><FontAwesomeIcon icon={faCreditCard}/>  <b>Qtz.</b>3,5000 tarjeta</h5>
                <h5><FontAwesomeIcon icon={faMoneyBillAlt}/> <b>Qtz.</b>8,5000 efectivo</h5>
                </CardBody>
            </Card>
            <Button className="excell-btn"> Resumen Excel <FontAwesomeIcon className="exe" icon={faFileExcel}/></Button>
        </div>
        </>

    )
}

export default Excell;