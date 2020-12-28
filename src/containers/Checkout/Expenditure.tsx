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
  faRedo, faCheckCircle, faArrowRight, faTruck, faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
import DBservice, {InventoryDB} from "../../services/DBservice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Link } from "react-router-dom";
import Inventory from '../Inventory/Inventory';




interface ExpenditureProps {
  menuItems: MenuItem[];
  cart: any[];
  totalCartValue: number;
  emptyCart: () => void;
}

function Checkout(props: ExpenditureProps) {

  const {createInventory} = InventoryDB();
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [nextPayment, setNextPayment] = useState(false);
  const [quantityAv, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [expenditure, setExpenditure] = useState(false)

  function getFormattedDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hr = String(today.getHours()).padStart(2, '0');
    var mn = String(today.getMinutes()).padStart(2, '0');
    const timestamp = hr + ':' + mn + '&' + dd + '-' + mm + '-' + yyyy;
    return timestamp;
  }
  function getDateforSection() {
    var date = new Date();
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

  }

  const registerSale = () => {
    if (!name || price===0)  return
    setName("");
    setPrice(0);
    setNextPayment(true);
  };
  const newRegister = ()=>{
    if (!name || price===0 || category==="")  return
    setName("");
    setPrice(0);
    setQuantity(1);
    setCategory("");
    setNextPayment(true);
  }
  
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
      "pedido": ["Egreso registrado"],
      "category": dateCategory,
      "valid": true,
    }
    // DBservice.createSale(newRow)
    //   .then(() => {
    //     // console.log(newRow)
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

  }
  
  const insertInventory = ()=>{
    if (!name || !category || price===0) return

    const stockInfo = {
      inStock:0,
      sold:0,
    }
    var data = {
      id: "",
      category: category,
      name: name,
      price: Number(price),
      image: "",
    };
    createInventory(data);
    // var dataDaily = {
    //   productID:invKey ,
    //   category: category,
    //   name: name,
    //   price: Number(price),
    //   image: "",
    //   stock: stockInfo,
    //   insertionID: "" ,
    // }
    // DBservice.insert2daily(dataDaily);
  };

  const getHeader = ()=>  expenditure ? 
      <>
      <h1><FontAwesomeIcon icon={faTruck}/></h1>
      <h2>Registrar egresos</h2> 
      </>
      :  
      <>
      <h1><FontAwesomeIcon icon={faPencilAlt}/> REGISTRAR INVENTARIO</h1>
      </>

  const getTitle = ()=> expenditure ? 
         <>
            <Button className="bruh" onClick={()=>setExpenditure(false)}> Cambiar a registrar nuevo producto {'  '} <FontAwesomeIcon icon={faArrowRight}/>{'  '} <FontAwesomeIcon icon={faArrowRight}/>{'  '} <FontAwesomeIcon icon={faArrowRight}/>{'  '} <FontAwesomeIcon icon={faArrowRight}/> </Button>
         </>
            : 
          <>
           <Button className="bruh" theme="warning" onClick={()=>setExpenditure(true)}> Cambiar a registrar nuevo egreso {'  '}  <FontAwesomeIcon icon={faArrowRight} /> {'  '}  <FontAwesomeIcon icon={faArrowRight} /> {'  '}  <FontAwesomeIcon icon={faArrowRight} /> </Button>
          </>

  return (
    <div className="checkout-container">
      {getHeader()}
      <br></br>
      {nextPayment ? ( 
        <>
        <div className="finalize">
          <br></br>
           <h4 className="done"> <FontAwesomeIcon icon={faCheckCircle} />{'  '} {expenditure ? "Egreso registrado": "Producto registrado"}</h4>
           <br></br>
           <Link to="/registro">
            <Button className="next" onClick={()=>setNextPayment(false)} theme ="success"> 
            Registrar otro {expenditure ? "egreso": "producto"}</Button>
            </Link>
      
            </div>
          
            </>
            ):(
        <>
   { !expenditure ? ( 
   <div>
   <div className="shipping-info">
   <h4>Categoría:</h4>
   <FormInput
       className="inputExpe"
       placeholder="Categoría del producto"
       value={category}
       onChange={(e) => {
         setCategory(e.target.value);
       }}
     />
    <h4>Nombre del producto:</h4>
   <FormInput
       className="inputExpe"
       placeholder="Nombre producto"
       value={name}
       onChange={(e) => {
         setName(e.target.value);
       }}
     />
          <h4>Precio del producto:</h4>
     <FormInput
       className="inputExpe"
       type="number"
       placeholder="Precio en Qtz."
       onChange={(e) => {
         setPrice(e.target.value);
       }}
     />
    {/* <p><b>Cantidad disponible</b></p>
    <FormInput
       className="input"
       type="number"
       placeholder="Disponible"
       value={quantityAv}
       onChange={(e) => {
         setQuantity(e.target.value);
       }}
     /> */}
     <Button
       onClick={() => { insertInventory(); newRegister();}}
       // href={writeOrder(name, address, phone, payMethod)}
       className="button" block>
              Registrar producto
     </Button>
   </div>

 </div>
    ) :(
        <div>
          <h4>Descripción:</h4>
          <div className="shipping-info">
            <FormInput
              className="inputExpe"
              placeholder="Descripción del egreso"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <h4>Precio Qtz.</h4>
            <FormInput
              className="inputExpe"
              type="number"
              placeholder="valor de egreso"
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
        </div>)}
      </>
      )}
    </div>
  );
}

export default Checkout;