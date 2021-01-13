import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
  } from 'shards-react';

import './PreviousInventory.scss'

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
            if(snapshot.val()){
                const snap = snapshot.val();
                const responseKeys = Object.keys(snap);
                setPreviousIn(responseKeys.map((k) => snap[k]).reverse());
}        });
        setFlag(false)
        return () => ref.off('value', refVal)
      }, [])

      
    return (
      <div className="rec-container">
        {loadingF && <Button>Cargando...</Button>}
        {!!previousInv.length  && <h3>Previos envíos</h3>}
        
       {!!previousInv.length ? previousInv.map((inv)=> <>
     <Card  className="card-inv-rec">
        <CardBody className="card-body-rec">
          <div className="card-content-rec">
            <CardTitle className="card-title-rec">{inv.timestamp.split('&')[0]}</CardTitle>
            <CardSubtitle>{inv.location}</CardSubtitle>
          </div>
        </CardBody>
      </Card>
      <Button className="retry-btn-rec" href={inv.whatsAppURL}> <FontAwesomeIcon icon={faEnvelope}/></Button>
     </>)
    : <h1>Todavia no hay ingresos</h1> 
    }
    </div>

    )

}

export default PreviousInventory;