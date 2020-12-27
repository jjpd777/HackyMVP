import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
import './Movement.scss' 

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
import DBservice, {MovementsDB, DateUtil, LedgerDB} from '../../services/DBservice';
import { useList } from "react-firebase-hooks/database";
import MovementCard from './MovementsCard';


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
    const {fetchNewsfeed} = LedgerDB();
    
    useEffect(()=>{
      const movementsReference = fetchNewsfeed();
      const refVal = movementsReference.on('value', function (snapshot) {
        const snap = snapshot.val();
        if(!snap) return;
        const respKeys = Object.keys(snap).reverse();
        console.log(typeof(respKeys), "JEJER")
        const kz = respKeys.filter((x)=> snap[x].type==='DESPACHO');
        console.log(kz);

        // kz.map((k)=>console.log(snap[k]))
        setMovements(kz.map((key)=> snap[key]))
      });
      return () => movementsReference.off('value', refVal);
    }, []);

    console.log("BRUH", movements)
    movements.map((x)=>console.log(x))  
    return (
        <>
      
        <div className="movement">
        <br></br>
        <br></br>
        <h2>{DATE}</h2>
        {!!movements.length && movements.map((x)=><><MovementCard movement={x}/></>)}
        <br></br>
        </div>
        </>
    )

}

export default Movements;