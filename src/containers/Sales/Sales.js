import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
import './Sales.scss' 
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

import { useList } from "react-firebase-hooks/database";
import { Container, Row, Col } from "shards-react";
import SalesCard from './SalesCard';
import DBservice, {DateUtil, SalesDB, DailyTransactionsDB} from '../../services/DBservice';


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import { bool } from 'prop-types';


function Sales() {
    const {getStandardDate} = DateUtil();
    const {getDaySales, getAllSales} = SalesDB();
    const TODAY = getStandardDate();
    const [dateHandler, setDate] = useState(TODAY);
    const [shopSale, setShopSale] = useState([]);
    // const [daysKeys, setDaysofSale] = useState([]);
    // const [datePointer, setDatePtr] = useState(0);
    const [validTickets2Date, setValidTickets]= useState(0);
  
  
  
    useEffect(() => {
        const ref = getDaySales(dateHandler);

        const refVal = ref.on('value', function (snapshot) {
          const snap = snapshot.val();
          if(!snap) return;
          const respKeys = Object.keys(snap).reverse();
          setShopSale(respKeys.map((key) => snap[key]))
        }, error => console.log(error));
        return () => ref.off('value', refVal)
      }, [dateHandler])
    
  
      // useEffect(() => {
      //   const ref = getAllSales();

      //   const refVal = ref.on('value', function (snapshot) {
      //     const snap = snapshot.val();
      //     if(!snap) return;
      //     const respKeys = Object.keys(snap);
      //     console.log("Days of service", respKeys)
      //     setDaysofSale(respKeys)
      //   }, error => console.log(error));
      //   return () => ref.off('value', refVal)
      // }, []);

      useEffect(()=>{
        var ptr =0;
        shopSale.map((x)=>x.summary.status==='valid' ? ptr++ :null)
        setValidTickets(ptr);
      },[shopSale])
  
  
      // const moveDate = ()=>{
      //   const ptr = (datePointer+1) % daysKeys.length;
      //   setDate(daysKeys[ptr])
      //   setDatePtr(ptr);
      // };

    return (
        <>
            <br></br>
            <br></br>
            {/* <Button onClick={()=> moveDate()}> {dateHandler}</Button> */}
            <br></br>
            <h2>Tickets hoy: {validTickets2Date}</h2>
            {!shopSale.length && <Button>Todavía no hay ventas...</Button>}
            <div className="sales-list-new">
            {shopSale.map((item, ix) => ix<5 &&
                    <>
                     <SalesCard salesItem={item}/>
                    </>
            )}
            </div>
        </>
    )

}

export default Sales;