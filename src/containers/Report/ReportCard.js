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
                var expenditures = tmpList.expenditures;
                expenditures = expenditures ? expenditures : 0;

                closeName = tmpList.name;
                setClosedDay([closeName, closeAmountCash, closeAmountCard, expenditures])
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
    const parseAway = (xx)=>{
        var x = String(xx);
        var y = String(parseFloat(x.replace(/,/g,'')))
        var z = parseFloat(y.replace(/-/g,''))
        return z;
    }
    const generateBalance = ()=> {
    if(CLOSED_DAY_FLAG){
        const openKash = parseAway(openedDay[1]); const closeKash = parseAway(closedDay[1]);
        const closeKard = parseAway(closedDay[2]);
        const expenditures = parseAway(closedDay[3]);

        const cashInStore = openKash + Number(cashTotal); // 1458 - 12
        const cashBalance = closeKash - Number(cashInStore) -expenditures; 
        const cardBalance = Number(cardTotal) - closeKard;
        const cardBool = cardBalance<0 || cardBalance===0; const cashBool = cashBalance>0 || cashBalance===0;
        const cardTxt = cardBool ? "Sobró $ tarjeta" : "Faltó $ tarjeta";
        const cashTxt = cashBool ? "Sobró $ efectivo" : "Faltó $ efectivo";
        const balance_card_text = (cardBalance===0 ? "Las ventas en tarjeta cuadraron cabal." : "VisaNet/Bantrab registró Q." + parseAway(cardBalance.toFixed(2)) + (cardBool ?" más":" menos") + " que Listosoftware." );
        const balance_cash_text = (cashBalance===0 ? "Las ventas en efectivo cuadraron cabal." : "En caja hay Q."+ parseAway(cashBalance.toFixed(2)) + (cashBool ?" más ":" menos ")+ " de lo registrado por Listosoftware.");
        var cardStyle ="in-balance"; var cashStyle="in-balance";
        const expenditure_text = Number(expenditures)===0 ? "Cero gastos" : "Qtz." + expenditures+" en gastos";
        if(cardBalance!==0) cardStyle = cardBool ? "balance-positive" : "balance-negative";
        if(cashBalance !==0) cashStyle =  cashBool ? "balance-positive" : "balance-negative";

        return (<>
            <h4 className="balance">- - BALANCE - - </h4>
            <div className="executive-summary">
            {cardBalance!==0 ? <h5>{cardTxt}</h5> : <h5> <FontAwesomeIcon icon={faCheckCircle}/>{'  '}Tarjeta cabal.</h5>}
            {cashBalance!==0 ? <h5>{cashTxt}</h5> : <h5><FontAwesomeIcon icon={faCheckCircle}/>{'  '}Efectivo cabal.</h5>}
            <h5>{expenditure_text}</h5>
            </div>
            <h4 className="balance">*  *  *</h4>

            {cardBalance!==0 && <h5 className={cardStyle}>{balance_card_text}</h5>}
            {cashBalance !==0 && <h5 className= {cashStyle}>{balance_cash_text}</h5>}

        </>)
    }else{
        return(<h4>No hay balance todavía.</h4>)
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
        const RESP = 'Cerró ' + closedDay[0] + ' con Q.' + closedDay[1]+" en caja y Q."+ closedDay[2] + " en PoS.";
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
                {!GLOBAL_FLAG && <h3> - - Ventas - -</h3>}
                <h5>Qtz. {averageTicket} / ticket</h5>
            {!GLOBAL_FLAG && <> <h4 className="rep-transactions"><FontAwesomeIcon icon={faMoneyBill}/>{' '}EFECTIVO: Q.{cashTotal}</h4><h4> {' '} <FontAwesomeIcon icon={faCreditCard}/>{' '}TARJETA: Q.{cardTotal}</h4></>}            
            </CardSubtitle>
          </div>
        </CardBody>
        <div className="BRUH">
            {!GLOBAL_FLAG && <>
                {generateBalance()}
            
            </>}

        </div>
      </Card>
      </div>
{ wzapFlag &&  <Button onClick={()=> {}}className="report-wzp">            <h5>{openSummary()}</h5><h5>{closeSummary()}</h5>
</Button>}        
</>
    )
}
export default ReportCard;