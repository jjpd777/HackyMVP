import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';
import { Container, Row, Col } from "shards-react";
import { Button } from 'shards-react';
import './ReportCard.scss'
import {
    faArrowAltCircleLeft,
    faCheckCircle,
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
                console.log("SIMPLE", tmpList)
                closeAmountCash = tmpList.closeAmountCash;
                closeAmountCard = tmpList.closeAmountCard;
                closeName = tmpList.name;
                console.log("BRUHHHH",[closeName, closeAmountCash, closeAmountCard])
                setClosedDay([closeName, closeAmountCash, closeAmountCard])
            }
        }

    },[openCloseProp])

    // useEffect(() => {
    //     if(!storeKey) return;
    //     const reference = isCashRegisterClosed(storeKey);
    //     const onValChange = reference.on('value', (snapshot) => {
    //     const x = snapshot.val();
    //     if(!x) return
    //     const kz = Object.keys(x);
    //     setClosedDay(kz.map((xx)=>x[xx]))
    //     });
    //     return () => reference.off('value', onValChange);
    //   }, [])
   
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
        return (<>
        <h2>Balances</h2>
        <h3>efectivo: Q.{cashBalance} tarjeta: Q.{cardBalance}</h3></>)
    }else{
        return(<h2>No hay balance todavía.</h2>)
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
                <h2>Qtz. {averageTicket} / ticket</h2>
                <h3>{'Q.'}{totalSales} {' en '}{validTickets}{' tickets.'}</h3>

            {!GLOBAL_FLAG && <> <h4 className="rep-transactions">EFECTIVO: Q.{cashTotal}</h4><h4> {' '}TARJETA: Q.{cardTotal}</h4></>}            </CardSubtitle>
          </div>
        </CardBody>
        <div className="BRUH">
            {!GLOBAL_FLAG && <><h3>{openSummary()}</h3><h3>{closeSummary()}</h3></>}

        </div>
      </Card>
      </div>
{ wzapFlag &&  <Button onClick={()=> {}}className="report-wzp">{generateBalance()} </Button>}        
</>
    )
}
export default ReportCard;