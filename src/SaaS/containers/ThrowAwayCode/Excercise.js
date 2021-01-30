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
    const PASS = handle ==="lic-galdamez"? '0791' : '1234';
    const PASSWORDVALID = String(user) === PASS;
    const currentCustomerFlag = handle ==="lic-galdamez" || handle === 'demo';
    const welcomingName = handle === 'demo' ? "¡a la demostración!" : "Lic. Galdámez";

    const textHelper = ["Facturación", "Registro"]
    const faviconHelper = [faCashRegister, faPencilAlt, faGlasses]
    console.log(currentCategory)
    const categoryBool = currentCategory ==="";
    const solagro = "https://solagroguate.com/wp-content/uploads/2020/05/g2994.png"
    return(
    <>

    {/* <img className="solagro-logo" src={solagro} /> */}
    {PASSWORDVALID && <img className="exercise-logo" src={fireLogo} />}

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
      { !categoryBool && currentCategory==="Facturación" && <TaxSegment navHelper = {setCurrentCategory} currentUser={handle}/>}
      {/* { !categoryBool && currentCategory==="Contabilidad"  && <Excell navHelper = {setCurrentCategory}/>} */}
      { !categoryBool && currentCategory==="Registro"  && <CardCollection navHelper = {setCurrentCategory} currentUser={handle}/>}

        </div>
        
    </div> :(
        <>
        {currentCustomerFlag && <div className="prompt-password">
        <h4>Bienvenido </h4>
            <h2>{welcomingName}</h2>
            <img className="welcome-logo" src={welcome} />
       {handle ==="demo" && <h3>Contraseña:</h3>}
        {handle ==="demo" && <h2>1234</h2>}
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
            
    </div>}
{ !currentCustomerFlag &&   <h3>Página no disponible</h3>}    </>
    )
    }
    </>
    )
}
export default Excercise;