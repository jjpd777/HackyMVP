import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';
import { Container, Row, Col } from "shards-react";
import { Button } from 'shards-react';
import './ReportCard.scss'
import {
    faArrowAltCircleLeft,
    faCheckCircle,
    faCreditCard,
    faTimes,
    faStore,
    faTrash,
    faEnvelope,
    faMoneyBill,
    faCashRegister
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DBservice, {StartCloseDB} from '../../services/DBservice';


function ReportCard(props){
    const {reportItem, storeKey, openCloseProp} = props;
    const [totalSales, setTotalSales]= useState(0);
    const [cardTotal, setCardTotal] = useState(0);
    const [cashTotal, setCashTotal] = useState(0);
    const [validTickets, setValTickets]= useState(0);
    const [invTickets, setInvTickets] = useState(0);
    const [averageTicket, setAvTicket] = useState(0);
    const [wzapFlag, setWhatsAppFlag] = useState(false);
    const [openedDay, setOpenedDay]=useState(["",0]);
    const [closedDay, setClosedDay]=useState(["",0]);
    const { isCashRegisterOpen,isCashRegisterClosed } = StartCloseDB();
    const [easyK, setEasyK] = useState(true);
    const GLOBAL_FLAG = storeKey ==="GLOBAL";

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const getValues = (input)=>{
        const xK = Object.keys(input);
        const resp = xK.map((xx)=>input[xx]);
        return resp[0];
    }

    console.log(openCloseProp)
    useEffect(()=>{
        if(!openCloseProp) return
        var openName = ""; var openAmount =0; var closeName= ""; 
        var closeAmountCash = 0; var closeAmountCard = 0;

        const checkValidProp = openCloseProp[0];

        if(!!checkValidProp){
            if(checkValidProp.open){
                const tmpList = getValues(checkValidProp.open);
                openAmount = tmpList.openAmountCash;
                openName = tmpList.name;
                setOpenedDay([openName, openAmount]);
            }
            if(checkValidProp.close){
                const tmpList = getValues(checkValidProp.close)
                closeAmountCash = tmpList.closeAmountCash;
                closeAmountCard = tmpList.closeAmountCard;
                closeName = tmpList.name;
                setClosedDay([closeName, closeAmountCash, closeAmountCard])
            }
        }

    },[openCloseProp])

    useEffect(()=>{
        generateReportSummary();
    },[reportItem])

    const generateReportSummary = ()=>{
        var validT = 0;var invalT = 0;var totalS = 0; 
        var cashT = 0; var cardT = 0;
        reportItem.map((x)=>{
            const sSummary = x.summary;
            if(sSummary.status==='valid'){
                const total = sSummary.total
                sSummary.paymentMethod=== 'efectivo' ? cashT+=total : cardT += total;
                validT++; totalS+=total;
            }else{invalT++}
        })
        const avT = totalS/validT;
        setValTickets(validT);setInvTickets(invalT);setTotalSales(totalS);
        setAvTicket(avT ? avT.toFixed(2) : "- -");
        setCashTotal(cashT); setCardTotal(cardT);

    };
    
    useEffect(()=>{generateReportSummary()},[props]);

    const CLOSED_DAY_FLAG = closedDay[0]!=="";

    const triggerWhatsAppMessage = ()=>{
        generateReportSummary()
        setWhatsAppFlag(!wzapFlag)
    };
    const generateBalance = ()=> {
    if(CLOSED_DAY_FLAG){
        const cashInStore = Number(openedDay[1]) + Number(cashTotal);
        const cashBalance = Number(cashInStore)-Number(closedDay[1]);
        const cardBalance = Number(cardTotal) - Number(closedDay[2]);
        const balance_card_text = (cardBalance>0 ? "Sobró " : "Faltó Q." )+ cardBalance + " de tarjeta y "
        const balance_cash_text = (cashBalance>0 ? "sobró " : "faltó Q." )+ cashBalance + " de efectivo."

        return (<>
            <h3>{balance_card_text}{balance_cash_text}</h3>
        </>)
    }else{
        return(<h3>No hay balance todavía.</h3>)
    };

    const whatsAppBalance = ()=>{
        const rsp = "";

    }

    }
    const openSummary = ()=> {
        const RESP = 'Abrió ' + openedDay[0] + ' con Q.' + openedDay[1]+" en caja.";
        return openedDay[0]=== "" ? " Aún no ha abierto." : RESP;
    }

     const closeSummary = ()=> {
         if(closedDay[0]==="") return;
         console.log(closedDay, "NIGGY")
        const RESP = 'Cerró ' + closedDay[0] + ' con Q.' + closedDay[1]+" en caja y "+ closedDay[2] + " en PoS.";
        return closedDay[0]=== "" ? " Aún no ha cerrado." : RESP;
     }
    return(
        <>
    <div className="report-card" onClick={()=> !GLOBAL_FLAG ? triggerWhatsAppMessage(): null} >
     <Card  className="rep-card">
        <CardBody
         className="rep-card-body">
          {/* {menuItem.image !== "" && (<img width="150" src={menuItem.image} />)} */}
          <div className="rep-card-content">
            <CardTitle className="rep-title">{storeKey}{' '}<FontAwesomeIcon icon={faCashRegister}/></CardTitle>
            <CardSubtitle className="rep-sub-title">  
                 <h2>{'Q.'}{numberWithCommas(totalSales)} {' total '}</h2>
                 <h5>{'en '}{validTickets}{' tickets.'}</h5>

                <h3>Qtz. {averageTicket} / ticket</h3>

            {!GLOBAL_FLAG && <> <h4 className="rep-transactions"><FontAwesomeIcon icon={faMoneyBill}/>{' '}EFECTIVO: Q.{cashTotal}</h4><h4> {' '} <FontAwesomeIcon icon={faCreditCard}/>{' '}TARJETA: Q.{cardTotal}</h4></>}            
            </CardSubtitle>
          </div>
        </CardBody>
        <div className="BRUH">
            {!GLOBAL_FLAG && <>
            <h5>{openSummary()}</h5><h5>{closeSummary()}</h5>
            
            </>}

        </div>
      </Card>
      </div>
{ wzapFlag &&  <Button onClick={()=> {}}className="report-wzp">{generateBalance()} </Button>}        
</>
    )
}
export default ReportCard;