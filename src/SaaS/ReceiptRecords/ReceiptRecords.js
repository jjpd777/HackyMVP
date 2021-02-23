import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
  } from 'shards-react';
import {keyMaper} from '../DevModules/HelperCRUD';
import ReceiptsCard from './ReceiptsCard'


import {TransactionRecordDB, DailyRecordDB} from '../Database/DatabaseFunctions';
// import {keyMaper} from './HelperCRUD';
import './ReceiptRecords.scss'



function ReceiptRecords (){
    const[receipts, setReceipts] = useState([]);
    const {readFromDaily} = DailyRecordDB();
    const {readTransactions} = TransactionRecordDB();
    const [references, setReferences] = useState([]);
    const [todaysObjects, setTodayObjects] = useState([])
    // useEffect(()=>{
    //     const ref = readTransactions();
    //     const valRef = ref.on('value', (x) => {
    //         const snapVal = x.val();
    //         if(!snapVal)return;
    //         setReceipts(keyMaper(keyMaper(snapVal)[0]).reverse())
    //       });

    //     return ()=> ref.off('value', valRef)
    // },[]);
    useEffect(()=>{
      const ref = readFromDaily();
      const valRef = ref.on('value', (x) => {
          if(!x.val())return;
        setReferences(keyMaper(x.val()).reverse())
        });
      return ()=> ref.off('value', valRef)
  },[]);

    console.log("REFERENCES", references)
    return(
        <div>
          <br></br>
          <br></br>
        {references.map((x)=><ReceiptsCard info={x}/>)}
        </div>
    )
}

export default ReceiptRecords;
