import React, { useEffect, useState } from 'react';
import {
    FormInput,
    Button,
    Card, CardBody, CardTitle, CardFooter
  } from 'shards-react';
  import {TransactionRecordDB} from '../Database/DatabaseFunctions';

  import './ReceiptRecords.scss'


  function ReceiptsCard(props){
      const {info} = props;
      const {updateTransaction} = TransactionRecordDB();
      const receiver = info.nombre;
      const id = info.insertionID
      const farm = info.finca;
      const payMethod = info.pago;
      const order = info.pedido;
      const status = info.status;
      const FIELDS = [receiver, farm, payMethod]
      const products = Object.keys(order);
      const tstamp = info.fecha.split("&").join(" ");
      const [cancel, setCancel] = useState(false);
      const cancelPath = tstamp.split(" ")[1]+"/"+id;
      const cancelTransaction = ()=>{
          updateTransaction(cancelPath,{"status":false})
      }
      return(
          <>
          <div onClick={()=>setCancel(!cancel)} className="receipt-container">
          <Card className="receipt-card">
          <CardTitle className="title">
                  <h3>{tstamp}</h3>
                    <h5>{status ? "Activo": "Cancelado"}</h5>
                  </CardTitle>
              <CardBody className="receipt-body">
                  <Button className="farm-btn" theme="success">
                  {farm}
                  </Button>
              </CardBody>
              <div>
                {products.map(x=><h5> {x} <b>{order[x].quantity}</b> {" unidades"}</h5>)}
              <CardFooter>
                <h4>{payMethod}</h4>
                <h5>{receiver}</h5>
              </CardFooter>

              </div>
          </Card>
          </div>
          {cancel && <Button className="cancel-btn" onClick={()=>cancelTransaction()}> Cancelar</Button>}

          </>
      )
  }
  export default ReceiptsCard;