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
        console.log("HELPER", resp)
        return resp[0];
    }

    console.log(openCloseProp)
    useEffect(()=>{
        if(!openCloseProp) return
        var openName = ""; var openAmount =0;
        var closeName= ""; var closeAmount = 0;

        const checkValidProp = openCloseProp[0];

        if(!!checkValidProp){
            if(checkValidProp.open){
                const tmpList = getValues(checkValidProp.open);
                openAmount = tmpList.openAmount;
                openName = tmpList.name;
                setOpenedDay([openName, openAmount]);
            }
            if(checkValidProp.close){
                const tmpList = getValues(checkValidProp.close)
                closeAmount = tmpList.closeAmount;
                closeName = tmpList.name;
                setClosedDay([closeName, closeAmount])
            }
        }

    },[openCloseProp])

    useEffect(() => {
        if(!storeKey) return;
        const reference = isCashRegisterClosed(storeKey);
        const onValChange = reference.on('value', (snapshot) => {
        const x = snapshot.val();
        if(!x) return
        const kz = Object.keys(x);
        setClosedDay(kz.map((xx)=>x[xx]))
        });
        return () => reference.off('value', onValChange);
      }, [])
    
      console.log("PROPPING",openedDay)
   
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

    const triggerWhatsAppMessage = ()=>{
        generateReportSummary()
        setWhatsAppFlag(!wzapFlag)
    };

    const openSummary = ()=> 
    <>
       { openedDay[0]=== "" ? <h5> Aún no ha abierto.</h5> :
        <h5>Abierto por <b>{openedDay[0] }</b> con {' Q.'}{openedDay[1]}{' '} en caja.</h5>
       }
    </>
     const closeSummary = ()=> 
     <>
        { closedDay[0]=== "" ? <h5> Aún no ha cerrado.</h5> :
         <h5>Cerrado por <b>{closedDay[0] }</b> con {' Q.'}{closedDay[1]}{' '} en caja.</h5>
        }
     </>
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
                <h3>{'Qtz.'}{totalSales} {' en '}{validTickets}{' tickets.'}</h3>

            {!GLOBAL_FLAG &&  <h4 className="rep-transactions">EFECTIVO: Q.{cashTotal} {' '}TARJETA: Q.{cardTotal}</h4>}            </CardSubtitle>
          </div>
        </CardBody>
        <h3>Balance: </h3>
      </Card>
      </div>
{ wzapFlag &&  <Button onClick={()=> {}}className="report-wzp"> <h2>{openSummary()}</h2><h2>{closeSummary()}</h2></Button>}        
</>
    )
}
export default ReportCard;