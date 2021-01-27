import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
  } from 'shards-react';
import {keyMaper} from '../DevModules/HelperCRUD';
import ReceiptsCard from './ReceiptsCard'


import {TransactionRecordDB} from '../Database/DatabaseFunctions';
// import {keyMaper} from './HelperCRUD';
import './ReceiptRecords.scss'



function ReceiptRecords (){
    const[receipts, setReceipts] = useState([]);
    const {readTransactions} = TransactionRecordDB()
    useEffect(()=>{
        const ref = readTransactions();
        const valRef = ref.on('value', (x) => {
            const snapVal = x.val();
            if(!snapVal)return;
            setReceipts(keyMaper(keyMaper(snapVal)[0]).reverse())
          });

        return ()=> ref.off('value', valRef)
    },[]);
    console.log(receipts)
    return(
        <>
        {receipts.map((x)=><ReceiptsCard info={x}/>)}
        </>
    )
}

export default ReceiptRecords;
