import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
// import './Report.scss' 
import {
    faCashRegister,
    faEnvelope,
    faBalanceScale,
    faMoneyBill,
    faCreditCard,
    faSearchDollar,
    faMoneyBillAlt,
    faCoins,
    faMoneyBillWave
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DBservice, {MovementsDB, DateUtil} from '../../services/DBservice';
import { useList } from "react-firebase-hooks/database";


import { Container, Row, Col } from "shards-react";

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "shards-react";


function Movements() {
    const [movements, setMovements] = useState([]);
    const {getStandardDate} = DateUtil();
    const DATE = getStandardDate();
    const {getAllMovements} = MovementsDB();
    
    useEffect(()=>{
      const movementsReference = getAllMovements();
      const refVal = movementsReference.on('value', function (snapshot) {
        const snap = snapshot.val();
        if(!snap) return;
        const respKeys = Object.keys(snap);
        setMovements(respKeys.map((k)=>snap[k]))
      });
      return () => movementsReference.off('value', refVal)
    }, [])
    
  
    return (
        <>
        <br></br>
        <br></br>
        <h2>{DATE}</h2>

        <br></br>
        <Container>

        {movements.map((item)=>
        <>
            <Row> <Col> <h3>- - -</h3></Col></Row>
            <Row>
                <Col>
                <Row>
                <h4> {item.type}</h4>
                </Row>
                <Row>
                <h4>{item.timestamp.split('&')[0]}{item.type==="EGRESO" ? " >>>" : " <<<"}</h4>
                </Row>
                </Col>
                <Col>
                <Row><h4><b>De:</b> {item.origin}</h4></Row>
                <Row><h4><b>A:</b> {item.destination}</h4></Row>
                </Col>
                <Col>
                  {item.movementItems.map((x)=> <Row> <b>{"(x " +x.quantity+ ") " + x.name}</b></Row>)}
                </Col>
                <Col>
                  {item.notes}
                </Col>
            </Row>
        
        </>
        
        )}  
                      </Container>
                      <br></br><br></br><br></br>
        </>
    )

}

export default Movements;