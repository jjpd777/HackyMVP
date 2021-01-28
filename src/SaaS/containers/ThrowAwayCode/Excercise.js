import React, { useState } from "react";
import {
    FormTextarea,
    InputGroup,
    InputGroupAddon,
    FormInput,
    InputGroupText,
    Button
} from 'shards-react';
import fireLogo from '../../../refurbished-logo.png';
import DemoTemplate from './Demo/DemoTemplate'
import Excell from './Excell/Excell';
import CardCollection from './CardCollection/CardCollection';
import TaxSegment from './TaxSegment/TaxSegment';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import './Excercise.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBook, faPencilAlt, faGlasses, faReceipt, faTicketAlt, faCashRegister, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import welcome from '../../../welcomee.png';

function Excercise(){
    let { handle } = useParams();
    const [user, setUser] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const PASS = '0791';
    const PASSWORDVALID = String(user) !== PASS;
    const currentCustomerFlag = handle ==="lic-galdamez"

    const textHelper = ["Facturación", "Registro"]
    const faviconHelper = [faCashRegister, faPencilAlt, faGlasses]
    console.log(currentCategory)
    const categoryBool = currentCategory ==="";
    const solagro = "https://solagroguate.com/wp-content/uploads/2020/05/g2994.png"
    return(
    <>
    {!currentCustomerFlag && <h3>Sorry that's not available</h3>}
    {/* <img className="solagro-logo" src={solagro} /> */}
    {PASSWORDVALID && <img className="exercise-logo" src={fireLogo} />}
    {handle !=="lic-galdamez"}
    {/* {!(PASSWORDVALID && currentCustomerFlag) &&
        <div className="prompt-password">
        <FormInput
            className="input"
            type="text"
            size="lg"
            placeholder={"contraseña"}
            value={user}
            onChange={(e) => {
                setUser(e.target.value);
            }}
        />
    </div>
    } */}
   { (PASSWORDVALID && currentCustomerFlag) ? 
   <div className="exercise-container">
       <div className="exercise-mini-header">
           {categoryBool && textHelper.map((x, ix)=>
           <Button onClick={()=>setCurrentCategory(x)} className="input"> 
              <FontAwesomeIcon icon={faviconHelper[ix]}/>  {x}
           </Button>)}
           <h2>{currentCategory}</h2>
       </div>
       <div className="exercise-mini-header">
      {/* {!categoryBool && <Button className="go-back" onClick={()=>setCurrentCategory("")} > 
      <FontAwesomeIcon icon={faArrowLeft}/>Regresar</Button>} */}
      </div>
        <div>
      { !categoryBool && currentCategory==="Facturación" && <TaxSegment navHelper = {setCurrentCategory}/>}
      {/* { !categoryBool && currentCategory==="Contabilidad"  && <Excell navHelper = {setCurrentCategory}/>} */}
      { !categoryBool && currentCategory==="Registro"  && <CardCollection navHelper = {setCurrentCategory}/>}

        </div>
        <div className="prompt-password">
        <h4>Bienvenido </h4>
            <h2>Lic. Galdámez!</h2>
            <img className="welcome-logo" src={welcome} />

        <FormInput
            className="input"
            type="number"
            // size="lg"
            placeholder={"Ingresar contraseña"}
            value={user}
            onChange={(e) => {
                setUser(e.target.value);
            }}
        />
            
    </div>
    </div> :(
        <h3>Sorry</h3>
    )
    }
    </>
    )
}
export default Excercise;