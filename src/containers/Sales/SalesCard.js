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
import DBservice, {SalesDB, LedgerDB, StoreDetailUtil, DateUtil} from '../../services/DBservice';


function SalesCard(props){
    const {store, salesItem} = props;
    const {insertLedgerEntry} = LedgerDB();
    const { unixTime, newMHDMY } = DateUtil();
    const {  GET_STORE_NAME, GET_JUST_POS } = StoreDetailUtil();
    console.log("SALESYY",salesItem)

    const [cancelSale, setCancel] = useState(false);
    const salesSummary = salesItem.summary;
    console.log(salesSummary)
    const tstamp = salesSummary.timestamp.split('&')[0];
    const status = salesSummary.status;
    const cartElements = salesSummary.cartItems;
    const insertSale = salesItem.insertionID;
    const boolFlag = status==="valid";
    const favStatus = <FontAwesomeIcon icon= {boolFlag ? faCheckCircle : faTimes} />
    const taxString = salesSummary.taxInfo;
    const {updateSale, updateSaleDynamically} = SalesDB();
    const STORE = "GERONA";
    const writeCancelledSale = (key)=> {
        updateLedger();
        const update = { 'summary/status': 'cancelled'};
        setCancel(false);
        updateSaleDynamically(store, key,update);


    }
    const triggerCancel = ()=>{
        if(!boolFlag) return
        setCancel(!cancelSale);
    };
    const updateLedger = () => {
      const unixTimestamp = unixTime();
      const readableTime = newMHDMY();
      const storeName = GET_STORE_NAME();
  
        cartElements.map((x) => {
          const data = {
            unix: unixTimestamp,
            timestamp: readableTime,
            productID: x.id,
            type: "VENTA_CANCELACION",
            store: storeName,
            productName: x.name,
            price: x.price,
            units: -x.quantity,
          };
      insertLedgerEntry(data);
        })
      };
    return(
        <>
    <div className="main-card" onClick={()=>triggerCancel()} >
     <Card  className="card">
        <CardBody
         className="card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="card-content">
            <CardTitle className="title">{' '}{salesSummary.paymentMethod} {' '} {tstamp}</CardTitle>
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