import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';
import { Container, Row, Col } from "shards-react";
import { Button } from 'shards-react';
import './ReportCard.scss'
import {
    faArrowAltCircleLeft,
    faCheckCircle,
    faTimes,
    faTrash,
    faEnvelope
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DBservice, {StartCloseDB} from '../../services/DBservice';


function ReportCard(props){
    const {reportItem, storeKey} = props;
    const [totalSales, setTotalSales]= useState(0);
    const [cardTotal, setCardTotal] = useState(0);
    const [cashTotal, setCashTotal] = useState(0);
    const [validTickets, setValTickets]= useState(0);
    const [invTickets, setInvTickets] = useState(0);
    const [wzapFlag, setWhatsAppFlag] = useState(false);
    const [openedDay, setOpenedDay]=useState(["Aún no han abierto.",0]);
    const [closeSalesDay, setClosedDay]=useState(["Aún no han cerrado.",0]);
    const { isCashRegisterOpen,isCashRegisterClosed } = StartCloseDB();
    const [easyK, setEasyK] = useState(true);

    useEffect(() => {
        const reference = isCashRegisterClosed(storeKey);
        const onValChange = reference.on('value', (snapshot) => {
        const x = snapshot.val();
        console.log("SF",x)
        if(!x) return
        const kz = Object.keys(x);
        setClosedDay(kz.map((xx)=>x[xx]))
        });
        return () => reference.off('value', onValChange);
      }, [wzapFlag])
    
      useEffect(() => {
        const reference = isCashRegisterOpen(storeKey);
        const onValChange = reference.on('value', (snapshot) => {
        const x = snapshot.val();
        if(!x) return;
        const kz = Object.keys(x);
        setOpenedDay(kz.map((xx)=>x[xx]))
        });
        return () => reference.off('value', onValChange);
      }, [wzapFlag])

    console.log("OPED", openedDay)
    
    useEffect(()=>{
        generateReportSummary();
    },reportItem)

    const generateReportSummary = ()=>{
        var validT = 0;var invalT = 0;var totalS = 0; 
        var cashT = 0; var cardT = 0;
        const rprt = reportItem;
        rprt.forEach((x)=>{
            const sSummary = x.summary;
            if(sSummary.status==='valid'){
                const total = sSummary.total
                totalS+=total;
                sSummary.paymentMethod=== 'efectivo' ? cashT+=total : cardT += total;
                validT++;

            }else{invalT++}
        })
        setValTickets(validT);setInvTickets(invalT);setTotalSales(totalS);
        setCashTotal(cashT); setCardTotal(cardT);

    }
    useEffect(()=>{generateReportSummary()},[props])
    const triggerWhatsAppMessage = ()=>{
        generateReportSummary()
        setWhatsAppFlag(!wzapFlag)
    }
    return(
        <>
    <div className="report-card" onClick={()=>triggerWhatsAppMessage()} >
     <Card  className="rep-card">
        <CardBody
         className="rep-card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="rep-card-content">
            <CardTitle className="rep-title">{storeKey}</CardTitle>
            <CardSubtitle>  
                <h3>{'Qtz.'}{totalSales} {' en '}{validTickets}{' tickets.'}</h3>
            <h4 className="rep-transactions">EFECTIVO: Q.{cashTotal} {' '}TARJETA: Q.{cardTotal}</h4>
            <h5>Abierto por: Juan con Q250 en caja.</h5>
            <h5>Cerrado por: Juan con Q1250 en caja.</h5>
            </CardSubtitle>
          </div>
          {/* <div className="card-price">

            <div className="subdiv">
            {'  '}
            {favStatus} 
          </div>
          {cartElements.map((x)=><p>{x.name}</p>)}

          </div> */}
        </CardBody>
      </Card>
      </div>
{ wzapFlag &&  <Button onClick={()=> {}}className="report-wzp"> Enviar por WhatsApp<FontAwesomeIcon icon={faEnvelope}/></Button>}        
</>
    )
}
export default ReportCard;