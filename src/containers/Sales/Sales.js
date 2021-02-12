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

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useList } from "react-firebase-hooks/database";
import { Container, Row, Col } from "shards-react";
import SalesCard from './SalesCard';
import DBservice, {DateUtil, SalesDB, DailyTransactionsDB, StoreDetailUtil} from '../../services/DBservice';


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import { bool } from 'prop-types';


function Sales() {
    const {getStandardDate} = DateUtil();
    const {GET_STORE_NAME, GET_LIST_STORES} = StoreDetailUtil();
    const {getDaySales, getDaySalesDynamically} = SalesDB();
    const TODAY = getStandardDate();
    const THIS_STORE = GET_STORE_NAME();
    const LIST_OF_STORES = GET_LIST_STORES();

    const [dateHandler, setDate] = useState(TODAY);
    const [storeHandler, setStore] = useState(THIS_STORE);
    const [shopSale, setShopSale] = useState([]);
    // const [daysKeys, setDaysofSale] = useState([]);
    // const [datePointer, setDatePtr] = useState(0);
    const [STORE_PTR, SET_STORE_PTR] = useState(0);
    const [validTickets2Date, setValidTickets]= useState(0);

  
    // useEffect(() => {
    //     const ref = getDaySales(dateHandler);

    //     const refVal = ref.on('value', function (snapshot) {
    //       const snap = snapshot.val();
    //       if(!snap) return;
    //       const respKeys = Object.keys(snap).reverse();
    //       setShopSale(respKeys.map((key) => snap[key]))
    //     }, error => console.log(error));
    //     return () => ref.off('value', refVal)
    //   }, [dateHandler]);

    useEffect(() => {
      const ref = getDaySalesDynamically(dateHandler,storeHandler);

      const refVal = ref.on('value', function (snapshot) {
        const snap = snapshot.val();
        if(!snap){ setShopSale([]) }else{
        const respKeys = Object.keys(snap).reverse();
        setShopSale(respKeys.map((key) => snap[key]))}
      }, error => console.log(error));
      return () => ref.off('value', refVal)
    }, [STORE_PTR])
    
  

      useEffect(()=>{
        var ptr =0;
        shopSale.map((x)=>x.summary.status==='valid' ? ptr++ :null)
        setValidTickets(ptr);
      },[shopSale])
  
      const next_store = ()=>{
        const x = (STORE_PTR+1) % LIST_OF_STORES.length;
        SET_STORE_PTR(x);
        setStore(LIST_OF_STORES[x]);
      }
      // const moveDate = ()=>{
      //   const ptr = (datePointer+1) % daysKeys.length;
      //   setDate(daysKeys[ptr])
      //   setDatePtr(ptr);
      // };

    return (
        <>
            <br></br>
            <br></br>
            <Button className="switch-store" onClick={()=> next_store()}>  {storeHandler}</Button>
            <br></br>
            <h2><FontAwesomeIcon icon={faCashRegister} /> El día de hoy van {validTickets2Date} tickets.</h2>
            {!shopSale.length && <Button className="not-yet">Todavía no hay ventas...</Button>}
            {!!shopSale.length && <h3>Últimas 3 son visibles y cancelables</h3>}
            <div className="sales-list-new">
            {shopSale.map((item, ix) => ix<3 &&
                    <>
                     <SalesCard store = {storeHandler} salesItem={item}/>
                    </>
            )}
            </div>
        </>
    )

}

export default Sales;