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
    const {readDayofSales}= PoS_DB(); 
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

    const chooseVoidType =()=>{
        if(taxData.req==="none"){
            console.log("cancelled");
        }else{
            cancelViaAPI()
        }
    }

    useEffect(()=>{
        const ref = readDayofSales(currentStore, "04-07-2021");
        const valRef = ref.on('value', (snapshot) => {
            const snap = snapshot.val(); 
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
                <h5>{x.summary.paymentMethod}</h5>
            </CardBody>
            {(nullRec && examineRec.insertionID===x.insertionID && x.summary.status==='valid') && <Button onClick={()=>{chooseVoidType()}}>Anular</Button>}
        </div>
        )}
        </div>
    </div>);
}

export default VoidReceipt