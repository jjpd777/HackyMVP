import React, { useEffect, useState } from 'react';
import { Button, FormInput, Card, CardBody } from 'shards-react';
import {PoS_DB, CashRegisterDB} from '../../Database/DatabaseFunctions';
import './DailyCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const keyMaper = (x)=>{
    const k = Object.keys(x);
    return k.map((t)=> x[t]);
};
function numberWithCommas(x) {
    if(!x)return;
    return x
    // var t = x.toFixed(2)
    // return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function otherNumber (x){
    if(!x) return;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function DailyCard(props){
    const {name, dayMonth, setDay, presentDay} = props;
    const [balances, setBalances] = useState([]);
    const {readDayofSales} = PoS_DB();
    const {readOpenCloseDay} = CashRegisterDB();
    const defaultVals = { 
        totalSales: 0, 
        totalValidTickets: 0,
        totalTaxedTickets: 0,
        totalCash: 0, 
        totalCard: 0,
        totalCashSAT: 0,
        totalCardSAT: 0,
        averageTicket: 0}

    // const [day, setDay] = useState(dayMonth ? dayMonth[dayPointer] :[])
    const[sales, setSales] = useState([])
    const [summaryItems, setSummaryItems] = useState(defaultVals);
    const [openRegister, setOpenRegister] = useState();
    const [closeRegister, setCloseRegister] = useState();
    const [fullDetail, setFullDetail] = useState(false);

    const calculateBalance = ()=>{
        const cashBalance = parseFloat(closeRegister.closeAmountCash) - (parseFloat(openRegister.openAmountCash) + parseFloat(summaryItems.totalCash));
        const cardBalance = parseFloat(closeRegister.cashBalance) - parseFloat( summaryItems.totalCard);
        setBalances([numberWithCommas(cashBalance), numberWithCommas(cardBalance)])
        // console.log("BROTHER", summaryItems.openAmountCash)

    }

    useEffect(()=>{
        const ref = readDayofSales(name, presentDay);
        const valRef = ref.on('value', (snapshot) => {
            const snap = snapshot.val(); 
            if(!snap) setSales([]); setSummaryItems(defaultVals);
            if(!snap) return;
            const keys = Object.keys(snap);
            setSales(keys.map((k)=>snap[k]));
          });
        return ()=> ref.off('value', valRef)
    },[presentDay, dayMonth]);

    useEffect(()=>{
        const ref = readOpenCloseDay(name, presentDay);
        const valRef = ref.on('value', (snapshot) => {
            const snap = snapshot.val(); 
            // if(!snap)  {setBalances([0,0]); setFullDetail(false); setCloseRegister()}
            if((snap && !snap.caja.open) || !snap) {
                setCloseRegister(null);
                setOpenRegister(null)};
            if(snap && !snap.caja.close) setCloseRegister(null);
            if(!snap) return;
            // setSales(keys.map((k)=>snap[k]));
            // if(snap.caja.close)console.log("BRUH", keyMaper(snap.caja.close)[0])
    
            if(snap.caja.open) setOpenRegister(keyMaper(snap.caja.open)[0])
            if(snap.caja.close) setCloseRegister(keyMaper(snap.caja.close)[0])
          });
        return ()=> ref.off('value', valRef)

    },[presentDay, dayMonth])
   
    console.log(openRegister, closeRegister, "BOOYAH")
    const summAllSales = (x)=>{
        var total = 0; var validTickets = 0; 
        var totalCard = 0; var totalCardSAT=0;
        var totalCash = 0; var totalCashSAT=0;
        var taxedTickets = 0;
        x.map((saleJson)=> {
            const j = saleJson.summary;
            const pf = Number(j.total)
            if(j.status ==='valid'){
                total += pf;
                validTickets+=1; 
                if(j.paymentMethod ==="efectivo"){
                    totalCash+= pf;
            }else {totalCard+=pf;}
            
            if(saleJson.taxData.req !=='none'){
                taxedTickets+=1;
                if(j.paymentMethod ==="efectivo") {totalCashSAT += pf
                }else {totalCardSAT += pf};
            }
        }
        }
        );
        const average = (total /validTickets).toFixed(2);

        setSummaryItems({
            totalSales: numberWithCommas(total), 
            totalValidTickets: validTickets,
            totalTaxedTickets: taxedTickets,
            totalCash: numberWithCommas(totalCash), 
            totalCard: numberWithCommas(totalCard),
            totalCashSAT: totalCashSAT,
            totalCardSAT: totalCardSAT,
            averageTicket: numberWithCommas(average),
        })    
    };
    useEffect(()=>{
        if(!sales.length) return
        summAllSales(sales);        
    }, [sales])
    useEffect(()=>{
        // if(!closeRegister) setBalances([0,0]); setFullDetail(false);
        if(!closeRegister) return
        if(!!closeRegister) calculateBalance();
        return
    },[sales,dayMonth])

    const balanceText = ()=>{
        var cashB="Efectivo cuadró cabal"; var cardB = "Tarjeta cuadró cabal";
        if(balances[0]>0){ cashB="Sobró Qtz."+ String(balances[0])+ " de efectivo"};
        if(balances[0]<0) {cashB="Faltó Qtz." + String(balances[0]) + " de efectivo";}
        if(balances[1]>0){ cashB="Sobró Qtz."+ String(balances[1]) + " de tarjeta.";}
        if(balances[1]<0){ cashB="Faltó Qtz." + String(balances[1]+ " de tarjeta.")}
        return [cashB, cardB];
    }
    return(
        <div onClick={()=>setFullDetail(!fullDetail)}>
            <Card className="card-element">
            <CardBody>
            <h3>{name}</h3>
            <h2><b>Qtz.</b>{otherNumber(summaryItems.totalSales.toFixed(2))}</h2>
                <h3><b>Qtz.</b>{summaryItems.averageTicket} / ticket</h3>
                <h4><b>Qtz.</b>{summaryItems.totalCash.toFixed(2)} en efectivo</h4>
                <h4><b>Qtz.</b>{summaryItems.totalCard.toFixed(2)} en tarjeta</h4>
                <h5>Total tickets {summaryItems.totalValidTickets}</h5>
                 <h5>Total facturados {summaryItems.totalTaxedTickets}</h5>
                
           {fullDetail && <div>
            <h3>- - -</h3>

                 <h5><b>Facturación</b></h5>
                <h5><b>Qtz.</b>{summaryItems.totalCashSAT} en efectivo</h5>
                <h5><b>Qtz.</b>{summaryItems.totalCardSAT} en tarjeta</h5>
                <h3>- - -</h3>

            {!!openRegister && <h5>Abrió {openRegister.name} con Qtz.{otherNumber(openRegister.openAmountCash)}</h5>}
            {!!closeRegister &&<h5>Cerró { closeRegister.name} con Qtz.{(closeRegister.closeAmountCash)}</h5>}
            {!!closeRegister &&<h5>=> {balanceText()[0]}</h5>}
            {!!closeRegister &&<h5>=> {balanceText()[1]}</h5>}
            </div>}
            </CardBody>
            
           

        </Card>

        </div>
    )
}

export default DailyCard;