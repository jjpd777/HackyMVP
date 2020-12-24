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
import DBservice, {MovementsDB, DateUtil, SalesDB, DailyTransactionsDB} from '../../services/DBservice';


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import { bool } from 'prop-types';


function Sales() {
    const {getStandardDate} = DateUtil();
    const {getDaySales} = SalesDB();
    const TODAY = getStandardDate();
    const {getTransactions4Date} = DailyTransactionsDB();
    // const TODAY ="20-12-2020";
    const [shopSale, setShopSale] = useState([]);
    const [insertIDs, setInsIDs]= useState([])
  
  
  
    useEffect(() => {
        const ref = getDaySales(TODAY);

        const refVal = ref.on('value', function (snapshot) {
          const snap = snapshot.val();
          if(!snap) return;
          const respKeys = Object.keys(snap);
          setShopSale(respKeys.map((key) => snap[key] ).reverse())
        }, error => console.log(error));
        return () => ref.off('value', refVal)
      }, [])
    
      useEffect(() => {
        const ref = getTransactions4Date(TODAY);

        const refVal = ref.on('value', function (snapshot) {
          const snap = snapshot.val();
          if(!snap) return;
          const respKeys = Object.keys(snap);
          setInsIDs(respKeys.map((key) => snap[key] ))
        }, error => console.log(error));
        return () => ref.off('value', refVal)
      }, [])
  
      console.log("INSER", insertIDs)


    return (
        <>
            <br></br>
            <br></br>
            <h1>Sevilla Restaurante</h1>
            <br></br>
            {!shopSale.length && <Button>Todavía no hay ventas...</Button>}
            <div className="sales-list-new">
            {shopSale.map((item) =>
                    <>
                     <SalesCard salesItem={item} insertIDs={insertIDs}/>
                    </>
            )}
            </div>
        </>
    )

}

export default Sales;