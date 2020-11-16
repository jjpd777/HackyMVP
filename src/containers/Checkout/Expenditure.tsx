import React, { useState } from 'react';
import './Checkout.scss';

import {
  Button,
} from 'shards-react';
import {
  FormTextarea,
} from 'shards-react';
import {
  FormInput,
} from 'shards-react';
import {
  faRedo, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import DBservice from "../../services/DBservice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Link } from "react-router-dom";



interface ExpenditureProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  emptyCart: () => void;
}

function Checkout(props: ExpenditureProps) {

  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [nextPayment, setNextPayment] = useState(false);

  function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }
  function getDateforSection() {
    var date = new Date();
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

  }

  const registerSale = () => {
    if (!name || price===0)  return
    setName("");
    setPrice(0);
  };
  
  const writeOrder = () => {
    if (!name || price===0) return

    const time = getFormattedDate();
    const dateCategory = getDateforSection();

    const catchSign = String(price).split('-');
    var expenditure= catchSign.length>1 ? Number(catchSign[1]) : price;
    var expenditure = -expenditure;

    const newRow = {
      "id": "",
      "name": name,
      "address": "",
      "phone": "",
      "payment": "",
      "taxInfo": "EGRESO",
      "total": expenditure,
      "date": time,
      "pedido": [],
      "category": dateCategory,
      "valid": true,
    }
    DBservice.create(newRow, "/ventas-borgona")
      .then(() => {
        // console.log(newRow)
      })
      .catch(e => {
        console.log(e);
      });
    setNextPayment(true);

  }


  return (
    <div className="checkout-container">
      {nextPayment ? ( 
        <>
        <div className="finalize">
          <br></br>
           <h4 className="done"> <FontAwesomeIcon icon={faCheckCircle} />{'  '} Compra Registrada</h4>
           <br></br>
           <Link to="/egresos">
            <Button className="next" theme ="success"> 
            Registrar otra compra</Button>
            </Link>
      
            </div>
           

            </>
            ):(
        <>
   
        <div>
          <div className="shipping-info">
            <FormInput
              className="input"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <FormInput
              className="input"
              type="number"
              placeholder="Monto"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Button
              onClick={() => { writeOrder(); registerSale();}}
              // href={writeOrder(name, address, phone, payMethod)}
              className="button" block>
              Registrar egreso
            </Button>
          </div>
        </div>
      </>
      )}
          
         
    </div>
  );
}

export default Checkout;