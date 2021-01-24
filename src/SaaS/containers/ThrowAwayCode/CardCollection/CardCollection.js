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
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        const refVal = ref.on('value', function (snapshot) {
            const snp = snapshot.val(); const dates = Object.keys(snp);
            setDates(dates);
            var recp=[]
            dates.map((day)=>{
                const k = Object.keys(snp[day]);
                k.map((x)=>recp.push(snp[day][x]));
            }); setReceipts(recp.reverse())
        });
        return () => ref.off('value', refVal)
      }, [])

    return(
<>
<Button className="go-back" onClick={()=>navHelper("")}> <FontAwesomeIcon icon={faArrowLeft}/>Regresar </Button>
<div className="loading">
{receipts.length ===0 && <Button className="btn" >Cargando...</Button>}
</div>
<div>
    {receipts.length !==0 && receipts.map((x)=><CardTemplate receiptInfo = {x}/>)}
    </div>
</>

    )
}

export default CardCollection;