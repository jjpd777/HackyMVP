import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
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
import DBservice from '../../services/DBservice'
import { Container, Row, Col } from "shards-react";


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "shards-react";


function Inventory(props) {

    const [STORENAME,setSTORENAME] = useState(DBservice.getStoreName())
    const [sortedInv, setSorted] = useState([]);

    useEffect(()=>{

    })

    const getColumns = (item, ix)=>{
    if (ix< props.registerItems.length) return <>
    <Row> <Col> <h3>- - -</h3></Col></Row>
            <Row>
                <Col>
                <Row>
                <h4> {item.name}</h4>
                </Row>
                </Col>
                <Col>
                <Row><h4><b>Stock:</b> {item.stock.inStock}</h4></Row>
                <Row><h4><b>Vendidos:</b> {item.stock.sold}</h4></Row>
                </Col>
            </Row>
    
    </>
    else return <>
     <Row> <Col> <h3>- - -</h3></Col></Row>
            <Row>
                <Col>
                <Row>
                </Row>
                </Col>
                <Col>
                <Row></Row>
                <Row></Row>
                </Col>
            </Row>
    </>
    }
//    console.log("INV", props.registerItems)

    return (
        <>
        <br></br>
        <br></br>
        <br></br>
         {props.registerItems.map((item,index)=>
        index %2 ===0 && <>
        <Container>
        <Row>
            <Col>
          {getColumns(item, index)}
          </Col>
          <Col><h3>|</h3></Col>
          <Col>
          {getColumns(props.registerItems[index+1], index+1)}
          </Col>
          </Row>
        </Container>
            
        </>
        
        )}     
        </>
    
    )

}

export default Inventory;