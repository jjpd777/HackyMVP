import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardColumns, CardFooter, CardText } from 'shards-react';
import { Container, Row, Col } from "shards-react";
import { Button } from 'shards-react';
import './MovCard.scss'
import {
    faArrowAltCircleLeft,
    faCheckCircle,
    faTimes,
    faTrash,
    faTruck,
    faPhone
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DBservice, {SalesDB} from '../../services/DBservice';


function MovementCard(props){

    const {movement} = props;
    const x = movement;
    const [action, setAction] = useState(false);
    const [delivered, setStatus] = useState(false);
    const ORIGIN = x.origin;
    const DESTINATION = x.destination;
    const QUIEN_DESPACHA = x.firstEmployee;
    const MENSAJERO = x.secondEmployee;
    const TIMESTAMP = x.timestamp.split('&')[0]
    const ORDER = x.movementItems;
    const ADDITIONAL_N = "Bring bitches";
    const STATUS = true;
    


    // const favStatus = <FontAwesomeIcon icon= {STATUS ? faCheckCircle : faTimes} />
    const favStatus =  <Button theme={ delivered ? "success" : "warning"}><FontAwesomeIcon icon={delivered ? faCheckCircle : faTruck }/>{'  '}
    {delivered ?  'Recibido':'En camino'}
    </Button>

    const triggerAction = ()=>{
        setStatus(!delivered);
        setAction(!action)
    }

    return(
        <>
    <div className="main-card" onClick={()=>triggerAction()} >
     <Card  className="card">
     {/* <CardTitle className="title">{' '}{QUIEN_DESPACHA} {' '} {TIMESTAMP}</CardTitle> */}
   
        <CardBody
         className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardSubtitle>  
            <p>origen</p>
            <h3><b>{ORIGIN}</b></h3>
            <p>destino</p>

            <h3><b>{DESTINATION}</b></h3>
            <br></br>
            <h5>NOTAS:</h5>

            <CardBody className="additional-notes">

                <h6> "THIS IS ONE VERy LONG SENTENCE, LIKE THE ROAD TO SUCCESS ITSLEF"</h6>
            </CardBody>
            </CardSubtitle>
            
          </div>

          <div className="card-price">

            <div className="subdiv">
            {'  '}
            {favStatus} 
          </div>
          {ORDER.map((x)=><p>{x.name}</p>)}

          </div>
        </CardBody>
        <CardFooter><b>{'Despachado por '}</b>{QUIEN_DESPACHA}<b>{' a '}</b>{MENSAJERO}{' a las '}{TIMESTAMP} {' de hoy'}.</CardFooter>
      </Card>
      </div>
      
{ action &&  <Button className="cancel-sale"> <FontAwesomeIcon icon={faTrash}/></Button>}        
{ action &&  <Button className="whatsapp-sale"> <FontAwesomeIcon icon={faPhone}/></Button>}        

</>
    )
}
export default MovementCard;