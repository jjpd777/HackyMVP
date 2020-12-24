import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';
import { Container, Row, Col } from "shards-react";
import { Button } from 'shards-react';
import './SalesCard.scss'
import {
    faArrowAltCircleLeft,
    faCheckCircle,
    faTimes,
    faTrash
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DBservice, {SalesDB} from '../../services/DBservice';


function MovementCard(props){
    const {salesItem, insertIDs} = props;
    const [action, setAction] = useState(false);
   
    const {updateSale} = SalesDB();
    const ORIGIN = "METROPLAZA";
    const DESTINATION = "P.F.";
    const QUIEN_DESPACHA = "KESIA";
    const MENSAJERO = "ENRIQUE";
    const TIMESTAMP = "12:34&24-12-2020".split('&')[0]
    const ORDER = ["Velvet cake","Chocolate Cake"]
    const ADDITIONAL_N = "Bring bitches";

    const favStatus = <FontAwesomeIcon icon= {boolFlag ? faCheckCircle : faTimes} />
    const triggerAction = ()=>{
        setAction(!action)
    }

    return(
        <>
    <div className="main-card" onClick={()=>triggerAction()} >
     <Card  className="card">
        <CardBody
         className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="title">{' '}{QUIEN_DESPACHA} {' '} {TIMESTAMP}</CardTitle>
            <CardSubtitle>  
            <h3>DE:<b>{ORIGIN}</b></h3>
            <h3>HACIA:<b>{DESTINATION}</b></h3>
            </CardSubtitle>
          </div>
          <div className="card-price">

            <div className="subdiv">
            {'  '}
            {favStatus} 
          </div>
          {ORDER.map((x)=><p>{x}</p>)}

          </div>
        </CardBody>
      </Card>
      </div>
{ action &&  <Button className="cancel-sale"> <FontAwesomeIcon icon={faTrash}/></Button>}        
</>
    )
}
export default MovementCard;