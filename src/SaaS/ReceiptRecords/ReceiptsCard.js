import React, { useEffect, useState } from 'react';
import {
  FormInput,
  Button,
  Card, CardBody, CardTitle, CardFooter
} from 'shards-react';
import { DailyRecordDB } from '../Database/DatabaseFunctions';

import './ReceiptRecords.scss'


function ReceiptsCard(props) {
  const { info } = props;
  const cabinName = info.split('/')[2];
  const { readOnce } = DailyRecordDB();
  const [cancel, setCancel] = useState(false);
  const [item, setItem] = useState({});
  useEffect(() => {
    const ref = readOnce(info);
    const refVal = ref.once('value').then((snapshot) => {
      if (!snapshot.val()) return;
      setItem(snapshot.val())
    });
  }, [info])


  return (
      <div onClick={() => setCancel(!cancel)} className="receipt-container">
            <h2>Cabaña {cabinName.split('-')[1]}</h2>
            <h3>Status: <b> {item.status ? "Activo" : "Anulado"}</b></h3>
            <h4>{item.timestamp && item.timestamp.split("&")[0]}</h4>
            {item.order && item.order.map(x => <h5> {x.name}</h5>)}
            <h1> - - - -</h1>
      </div>
  )
}
export default ReceiptsCard;