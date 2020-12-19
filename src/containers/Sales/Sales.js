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
import DBservice from '../../services/DBservice';
import { useList } from "react-firebase-hooks/database";
import { Container, Row, Col } from "shards-react";


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import { bool } from 'prop-types';


function Sales() {

    const defaultDate = DBservice.getDateforSection();
    // const defaultDate = "17-12-2020"
    const [startToday, setDate4Sales] = useState(defaultDate);
    const [dbRegisterSales, salesLoading, salesError] = useList(DBservice.fetchDateSales(startToday));
    const [salesItems, setSalesItems] = useState([]);
    const [cancellationIX, setCancellationIX] = useState([]);
    // const validating = ()=>{ setDate4Sales("16-12-2020"); console.log(salesPerShop)};

    const placeSales = (dboject) => {
        const obj = dboject.map((tutorial) => tutorial.val());
        const uniqd = dboject.map((tutorial) => tutorial.key);
        obj.map((item, ix) => item.id = uniqd[ix]);
        const sales = obj.reverse();
        var cancellIX = [];
        sales.map((x)=> cancellIX.push([x.id, false]));
        setCancellationIX(cancellIX);
        setSalesItems(sales);
    }
    useEffect(() => placeSales(dbRegisterSales), [dbRegisterSales]);

    const checkCancellationFlag = (uid)=>{
        var item2flip = cancellationIX.find((x)=>x.id === uid);
        const newItem = [true, item2flip[1]]
        var newArray = cancellationIX.filter((x)=> x.id!== uid);
        newArray.map((x)=> x[1]= false)
        newArray.push(newItem);
        setCancellationIX(newArray);



    }

    const getColumns = (item) => {
        if(!item) return;
        const salesSummary = item.summary;
        const timestamp = salesSummary.timestamp.split('&')[0];
        const status = salesSummary.status;
        const cartElements = salesSummary.cartItems;
        const boolStatus = status==="valid";
        return <>
            <Row> <Col> { <h3>- - - - - - - - - </h3>}</Col></Row>
            <Row>
                <Col>
                    <Row>
                        <Button theme={boolStatus ? "success" : "danger"}><h2><b>{boolStatus ? "Válido" : "X"}</b></h2></Button>                  
                    </Row>
                    <br></br>
                    <Row><h2>{timestamp}</h2></Row>
                </Col>
                <Col>
                        {cartElements.map((x)=>  <Row>{"x"} {x.quantity} {" "}{x.name} </Row>)}
                </Col>
            </Row>
            <Row><h5>{salesSummary.paymentMethod}</h5></Row>
        </>
    }

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            {salesLoading && <Button>Cargando...</Button>}
            {salesItems.map((item, index) =>
                index % 2 === 0 && <>
                    <Container>
                        <Row>
                            <Col>
                                {getColumns(item)}
                            </Col>
                            <Col><h3>|</h3></Col>
                            <Col>
                                {getColumns(salesItems[index + 1])}
                            </Col>
                        </Row>
                    </Container>

                </>

            )}
        </>
    )

}

export default Sales;