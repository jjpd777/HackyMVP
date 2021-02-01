import React, { useEffect, useState } from 'react';
import { Button, FormInput, Card, CardBody } from 'shards-react';
import {PoS_DB} from '../../Database/DatabaseFunctions';
import './SalesCard.scss';
const keyMaper = (x)=>{
    const k = Object.keys(x);
    return k.map((t)=> x[t]);
};

function numberWithCommas(x) {
    if(!x)return;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function SalesCard(props){
    const defaultVals = {
        totalSales: 0, 
        totalValidTickets: 0,
        totalTaxedTickets: 0,
        totalCash: 0, 
        totalCard: 0,
        totalCashSAT: 0,
        totalCardSAT: 0,
        averageTicket: 0,
    }

    const {name, month} = props;
    const [totalSales, setTotalSales] = useState(0)
    const {readSales} = PoS_DB()
    const [sales, setSales] = useState([]);

    const [summaryItems, setSummaryItems] = useState(defaultVals);
    console.log("SALESES", month)

    useEffect(()=>{
        const ref = readSales(name);
        const valRef = ref.on('value', (snapshot) => {
            const snap = snapshot.val(); 
            if(!snap) return;
            const keys = Object.keys(snap);
            var allSales = []
            const matchMonth = keys.filter(x =>x.split('-')[1]===String(month));
            matchMonth.map(k => allSales.push(keyMaper(snap[k])));
            setSales(allSales);
          });
        return ()=> ref.off('value', valRef)
    },[month]);


    const summAllSales = (x)=>{
        var total = 0; var validTickets = 0; 
        var totalCard = 0; var totalCardSAT=0;
        var totalCash = 0; var totalCashSAT=0;
        var taxedTickets = 0;
        x.map((element)=> element.map( (saleJson) => {
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
        }}
        ));
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
        if(!sales.length) setSummaryItems(defaultVals)
        if(!sales.length) return
        summAllSales(sales);
        
    }, [sales])

    return(
        <div className="card-container">
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
export default SalesCard;