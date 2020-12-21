import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
  } from 'shards-react';


import {
    faEnve,
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

import { InventoryDB, DateforSection } from '../../services/DBservice';
import ItemCard from '../../components/ItemCard/ItemCard';

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "shards-react";


function PreviousInventory() {
    const [previousInv, setPreviousIn] = useState([]);
    const {root4previousInv} = InventoryDB();
    const [loadingF, setFlag] = useState(true);
    const currentDate = DateforSection().split('/')[0];
    useEffect(() => {
        const ref = root4previousInv();

        const refVal = ref.on('value', function (snapshot) {
            if(!snapshot.val()) setPreviousIn([]);
            else{
          const snap = snapshot.val();
          const responseKeys = Object.keys(snap);
          setPreviousIn(responseKeys.map((k) => snap[k]));
}        });
        setFlag(false)
        return () => ref.off('value', refVal)
      }, [])

      
    return (
        <>
        <br></br>
        <br></br><br></br>
        {loadingF && <Button>Cargando...</Button>}
       {!!previousInv.length ? previousInv.map((inv)=> <>
     <Card  className="card">
        <CardBody className="card-body">
          <div className="card-content">
            <CardTitle className="card-title">{inv.timestamp.split('&')[0]}</CardTitle>
            <CardSubtitle>{inv.location}</CardSubtitle>
          </div>
        </CardBody>
      </Card>
      <Button className="retry-btn" href={inv.whatsAppURL}> Enviar de nuevo {'  '}<FontAwesomeIcon icon={faEnvelope}/></Button>
     </>)
    : <h1>Todavia no hay ingresos</h1> 
    }
     </>
    )

}

export default PreviousInventory;