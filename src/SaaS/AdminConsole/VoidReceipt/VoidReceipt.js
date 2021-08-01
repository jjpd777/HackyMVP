import React, { useEffect, useState } from 'react';
import { Button, FormInput, Card, CardBody } from 'shards-react';
import { PoS_DB, newMHDMY } from '../../Database/DatabaseFunctions';
// import DailyCard from './DailyCard';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import './VoidReceipt.scss'

const STORES = ["GERONA","COMERCIA" ,"NOVITA", "PLAZOLETA",
         "FRAIJANES","AUTOPAN"];

function VoidReceipt() {
    const {readDayofSales, updateSaleDynamically}= PoS_DB(); 
    const [currentDay, setCurrentDay] = useState(newMHDMY().split('&')[1]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [currentStore, setCurrentStore] = useState(STORES[0]);
    const [dayReceipts, setDayReceipts] = useState([]);
    const [examineRec, setExamineRec] = useState([])
    const [taxData, setTaxData] = useState(null);
    const [nullRec, setNullReceipt] = useState(false);

    const request2API = async (body) => {
        const rsp = await fetch(
          'https://vrit6y3xga.execute-api.us-east-2.amazonaws.com/v1/fact1',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
          console.log(rsp, "JSON RESPONSE")
        return rsp.json();
      };
      const cancelViaAPI = async ()=>{
        return request2API({
          "Transaccion": {
            "tipoaccion" : "anulacion",
            "tipodoc" : "factura"
          },
          "infoAnulacion": {
            "serieDoc": "Z",
            "noDoc": taxData.req.infoTienda.numeroInterno,
            "uuidDoc": taxData.res.body.success.Autorizacion,
          },
          "infoTienda": {
            "nombre": taxData.req.infoTienda.nombre,
            "sede": taxData.req.infoTienda.sede,
            "numeroSede": taxData.req.infoTienda.numeroSede,
            "nit": taxData.req.infoTienda.nit
          }
        })
      }

  

    useEffect(()=>{
        const ref = readDayofSales(currentStore, currentDay);
        const valRef = ref.on('value', (snapshot) => {
            const snap = snapshot.val(); 
            if(!snap)setDayReceipts([])
            if(!snap) return;
            const keys = Object.keys(snap);
            setDayReceipts(keys.map((k)=>snap[k]).reverse());
          });
        return ()=> ref.off('value', valRef)

    },[currentStore])

    const chooseReceipt = (x)=>{
        setExamineRec(x);
        setTaxData(x.taxData)
        console.log(x);
    }
    
    const writeCancelledSale = async (key)=> {

      if(taxData.res!=="none"){ await cancelViaAPI().then(x=>{
          console.log(taxData)
          const update = { 'summary/status': 'cancelled', 'cancellationRes': x};
          setNullReceipt(false);
          console.log(currentStore, key, update, "TERERERE");
          console.log(taxData.req.infoTienda.numeroInterno,taxData.res.body.success.Autorizacion,taxData.req.infoTienda.nombre,
              taxData.req.infoTienda.sede,
              taxData.req.infoTienda.numeroSede,
              taxData.req.infoTienda.nit
          )
          updateSaleDynamically(currentStore, key,update);})
      }else{
          const update = { 'summary/status': 'cancelled', 'cancellationRes': "none"};
          setNullReceipt(false);
          updateSaleDynamically(currentStore, key,update);
        }

       
    }

    return(
    <div>
        
        <div>

        {STORES.map(x =>   <Button className="stores" onClick={()=>{ setCurrentStore(x)}}>{x}</Button>)}
        <br></br>
        <div className="receipt-store">
        <h4>{currentStore}</h4>
        </div>
        {dayReceipts && dayReceipts.map(x=> 
        <div>
            <CardBody className="card-receipt" onClick={()=>{
                if((nullRec && examineRec.insertionID===x.insertionID )){setNullReceipt(false)}
                else{chooseReceipt(x); setNullReceipt(true)}}}>
                <h5>{x.summary.timestamp.split('&').join(' ')}</h5>
                <h5>Qtz. {x.summary.total} </h5>
                <h5>STATUS: {x.summary.status==='valid'? 'Vigente' : 'Anulada'}</h5>
                <h4>{taxData?.req==='none'? "Envío": "NIT: "+ x.summary.taxInfo}</h4>
                <h5>{x.summary.paymentMethod}</h5>
            </CardBody>
            {(nullRec && examineRec.insertionID===x.insertionID && x.summary.status==='valid') && <Button onClick={()=>{writeCancelledSale(x.insertionID)}}>Anular</Button>}
        </div>
        )}
        </div>
    </div>);
}

export default VoidReceipt