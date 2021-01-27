import React, { useEffect, useState } from 'react';
import {
    Button,
    FormInput,
    Card,
    CardBody,
} from 'shards-react';
import CardTemplate from './CardTemplate';
import { faCheckCircle, faBook, faCreditCard, faArrowLeft,
    faGlasses, faMoneyBillAlt,faPhoneSquare,
    faFileExcel,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ReceiptDB} from '../Database/DatabaseFunctions'

import './CardCollection.scss';

function CardCollection(props){
    const {readReceipts} = ReceiptDB();
    const {navHelper} = props;
    const ref = readReceipts();
    const [dates, setDates] = useState([]);
    const [months, setMonths] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('all'); //["01-2021", ]
    const [currentReceipts, setCurrentReceipts] = useState([]);

    useEffect(() => {
        const refVal = ref.on('value', function (snapshot) {
            const snp = snapshot.val(); const dates = Object.keys(snp);
            setDates(dates);
            var recp=[]
            dates.map((day) => {
                    const k = Object.keys(snp[day]);
                    k.map((x)=>recp.push(snp[day][x]));
            }); setReceipts(recp.reverse())
        });
        return () => ref.off('value', refVal)
      }, [])
    const dateParsingHelper = (x)=>{
            const t = x.split('-'); t.shift();
            return t.join("/");
    }
    useEffect(()=>{
        const d = dates.map(x=> dateParsingHelper(x)); const m = new Set(d); 
        setMonths(m); setCurrentMonth(m[0]);
    },[dates])

    useEffect(()=>{
        const t = receipts.map(x => {
            const parsed = dateParsingHelper(x.timestamp);
            if(parsed === currentMonth) return x;
        })
        setCurrentReceipts(t);
    },[currentMonth]);


    return(
<>
<Button className="go-back" onClick={()=>navHelper("")}> <FontAwesomeIcon icon={faArrowLeft}/>Regresar </Button>
<div className="loading">
{receipts.length ===0 && <Button className="btn" >Cargando...</Button>}
</div>
<div>
    {/* <Button> {dates}</Button> */}
    {receipts.length !==0 && receipts.map((x)=> !x.issuedInEmergency ? <CardTemplate receiptInfo = {x}/> : <h3>En contingencia</h3>)}
    </div>
</>

    )
}

export default CardCollection;