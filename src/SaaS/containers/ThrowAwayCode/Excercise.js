import React, { useState } from "react";
import {
    FormTextarea,
    InputGroup,
    InputGroupAddon,
    FormInput,
    InputGroupText,
    Button
} from 'shards-react';
import fireLogo from '../../../fire-logo.png';
import DemoTemplate from './Demo/DemoTemplate'
import Excell from './Excell/Excell';
import CardCollection from './CardCollection/CardCollection'


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

function Excercise(){
    let { handle } = useParams();
    const [user, setUser] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const PASS = "paralistos";
    const PASSWORDVALID = user !== PASS;

    const textHelper = ["Facturación", "Registro", "Contabilidad"]
    const faviconHelper = [faCashRegister, faPencilAlt, faGlasses]
    console.log(currentCategory)
    const categoryBool = currentCategory ==="";
    const solagro = "https://solagroguate.com/wp-content/uploads/2020/05/g2994.png"
    return(
    <>
    {/* <img className="solagro-logo" src={solagro} /> */}
    <img className="exercise-logo" src={fireLogo} />

   { PASSWORDVALID ? 
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
      { !categoryBool && currentCategory==="Facturación" && <DemoTemplate navHelper = {setCurrentCategory}/>}
      { !categoryBool && currentCategory==="Contabilidad"  && <Excell navHelper = {setCurrentCategory}/>}
      { !categoryBool && currentCategory==="Registro"  && <CardCollection navHelper = {setCurrentCategory}/>}
      
     

        </div>
    </div> :
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
    }
    </>
    )
}
export default Excercise;