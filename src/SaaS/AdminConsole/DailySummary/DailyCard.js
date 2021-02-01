import React, { useEffect, useState } from 'react';
import { Button, FormInput, Card, CardBody } from 'shards-react';
import {PoS_DB} from '../../Database/DatabaseFunctions';
import './DailyCard.scss';

const keyMaper = (x)=>{
    const k = Object.keys(x);
    return k.map((t)=> x[t]);
};
function numberWithCommas(x) {
    if(!x)return;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function DailyCard(props){
    const {name, dayMonth, setDay, presentDay} = props;
    const {readDayofSales} = PoS_DB();
    const defaultVals = { totalSales: 0, 
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
   
    const summAllSales = (x)=>{
        var total = 0; var validTickets = 0; 
        var totalCard = 0; var totalCardSAT=0;
        var totalCash = 0; var totalCashSAT=0;
        var taxedTickets = 0;
        x.map((saleJson)=> {
            const j = saleJson.summary;
            if(j.status ==='valid'){
                total += j.total;
                validTickets+=1; 
                if(j.paymentMethod ==="efectivo"){
                    totalCash+=j.total;
            }else {totalCard+=j.total;}
            
            if(saleJson.taxData.req !=='none'){
                taxedTickets+=1;
                if(j.paymentMethod ==="efectivo") totalCashSAT +=j.total;
                else totalCardSAT +=j.total;
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
    return(
        <div>
            <Card className="card-element">
            <CardBody>
            <h3>{name}</h3>
            <h2><b>Qtz.</b>{summaryItems.totalSales}</h2>
                <h3><b>Qtz.</b>{summaryItems.averageTicket} / ticket</h3>
                <h4><b>Qtz.</b>{summaryItems.totalCash} en efectivo</h4>
                <h4><b>Qtz.</b>{summaryItems.totalCard} en tarjeta</h4>
            <h3>- - -</h3>
                <h5><b>Facturación</b></h5>
                <h5><b>Qtz.</b>{summaryItems.totalCashSAT} en efectivo</h5>
                <h4><b>Qtz.</b>{summaryItems.totalCardSAT} en tarjeta</h4>
            </CardBody>
            <h5>Total de tickets {summaryItems.totalValidTickets}</h5>
            <h5>Total de tickets facturados {summaryItems.totalTaxedTickets}</h5>
        
        </Card>

        </div>
    )
}

export default DailyCard;