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


function SalesCard(props){
    const {salesItem, insertIDs} = props;
    const [cancelSale, setCancel] = useState(false);
    const salesSummary = salesItem.summary;
    const timestamp = salesSummary.timestamp.split('&')[0];
    const status = salesSummary.status;
    const cartElements = salesSummary.cartItems;
    const insertSale = salesItem.insertionID;
    const boolFlag = status==="valid";
    const favStatus = <FontAwesomeIcon icon= {boolFlag ? faCheckCircle : faTimes} />
    const taxString = salesSummary.taxInfo;
    const {updateSale} = SalesDB();

    const writeCancelledSale = (key)=> {
        const update = { 'summary/status': 'cancelled'};
        setCancel(false);
        updateOnCancellation();
        updateSale(key,update);


    }
    const triggerCancel = ()=>{
        if(!boolFlag) return
        setCancel(!cancelSale);
    };
    const updateOnCancellation = () => {
        console.log(cartElements, "FSAD")
        cartElements.map((cartItem) => {
          insertIDs.map((register) => {
              console.log("here", cartItem, register)
            if (cartItem.id === register.productID) {
              const destinationItem = insertIDs.find((x)=> x.productID === cartItem.id);
              console.log("FOUND", destinationItem);
              const soldUnits =  destinationItem.stock.sold -cartItem.quantity;
              const inStockUnits = destinationItem.stock.inStock + cartItem.quantity;
              const dataUpdate = { "stock/sold": soldUnits, "stock/inStock":inStockUnits};
              DBservice.updateSoldUnits(destinationItem.insertionID, dataUpdate);
            }
          });
        });
      };
    return(
        <>
    <div className="main-card" onClick={()=>triggerCancel()} >
     <Card  className="card">
        <CardBody
         className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="title">{' '}{salesSummary.paymentMethod} {' '} {timestamp}</CardTitle>
            <CardSubtitle>  
            <h3>NIT:<b>{taxString}</b></h3>
            </CardSubtitle>
          </div>
          <div className="card-price">

            <div className="subdiv">
            {'  '}
            {favStatus} 
          </div>
          {cartElements.map((x)=><p>{x.name}</p>)}

          </div>
        </CardBody>
      </Card>
      </div>
{ cancelSale &&  <Button onClick={()=> writeCancelledSale(insertSale)}className="cancel-sale"> <FontAwesomeIcon icon={faTrash}/></Button>}        
</>
    )
}
export default SalesCard;