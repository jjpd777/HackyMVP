import React, { useState, useEffect } from 'react';
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
  import {
    ListGroup,
    ListGroupItem,
    FormInput,
    FormRadio,
  } from 'shards-react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DBservice, {SalesDB, LedgerDB, DateUtil} from '../../services/DBservice';


function MovementCard(props){

    const {movement} = props;
    const [x, setX] = useState(movement);
    useEffect(()=> setX(movement),[movement])
    const {updateLedger} = LedgerDB();
    const {newMHDMY} = DateUtil();
    const [thirdEmployee, setThirdEmployee] = useState("");
    const [action, setAction] = useState(false);

    const MOVEMENT_ID = x.movementID;
    const ORIGIN = x.origin;
    const DESTINATION = x.destination;
    const FIRST_EMPLOYEE = x.firstEmployee;
    const SECOND_EMPLOYEE = x.secondEmployee;
    const THIRD_EMPLOYEE = x.thirdEmployee;
    const TIMESTAMP = x.timestamp.split('&')[0]
    const ORDER = x.movementItems;
    const ADDITIONAL_N = x.notes;
    const RECEIVED_STATUS = x.received;
    const RECEIVED_TIMESTAMP = x.receivedTimestamp.split('&')[0]
    const RECEIVED = x.thirdEmployee !=='RECEIVER';

    const updateReceivedMovement = ()=>{
      if(thirdEmployee==="")return;
      const data ={
        thirdEmployee: thirdEmployee,
        received:true,
        receivedTimestamp:newMHDMY()
      };
      updateLedger(MOVEMENT_ID,data);
    }
    


    // const favStatus = <FontAwesomeIcon icon= {STATUS ? faCheckCircle : faTimes} />
    const favStatus = (x)=>  <Button theme={ x ? "success" : "warning"}><FontAwesomeIcon icon={x ? faCheckCircle : faTruck }/>{'  '}
    { x ?  'Recibido':'En camino'}
    </Button>

    const triggerAction = ()=>{
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

                <h6> {ADDITIONAL_N}</h6>
            </CardBody>
            </CardSubtitle>
            
          </div>

          <div className="card-price">

            <div className="subdiv">
            {'  '}
            {favStatus(RECEIVED_STATUS)} 
          </div>
          {ORDER.map((x)=><p>{x.name}</p>)}

          </div>
        </CardBody>
        <CardFooter><b>{'Despachado por '}</b>{FIRST_EMPLOYEE}<b>{' a '}</b>{SECOND_EMPLOYEE}{' a las '}{TIMESTAMP} {' de hoy'}.</CardFooter>
       { RECEIVED && <CardFooter><b>{'Recibido por '}</b>{THIRD_EMPLOYEE}{' a las '}{RECEIVED_TIMESTAMP} {' de hoy'}.</CardFooter>}
      </Card>
  
      </div>
      {action && !RECEIVED &&( 
      <>
      <h3>Persona que recibe:</h3>
      <FormInput
            className="input"
            placeholder=""
            onChange={(e) => {
              setThirdEmployee(e.target.value);
            }}
              />
              { action && !RECEIVED&&  <Button className="canc-sale" onClick={()=>updateReceivedMovement()}theme="success"> <FontAwesomeIcon icon={faCheckCircle}/></Button>}        
      </>)
                    }
      
{ action &&  <Button className="whatsapp" theme="success"> WhatsApp{'  '} <FontAwesomeIcon icon={faCheckCircle}/></Button>}        

</>
    )
}
export default MovementCard;