import React, { useEffect, useState } from 'react';
import {
  FormTextarea,
  FormRadio,

} from 'shards-react';
import DBservice from '../../services/DBservice'

import { Button } from 'shards-react';
import './AddItems.scss'
import {
  faCashRegister, faCheckCircle, faTimes, 
  faHatChef, faStoreAlt, faArrowDown, faMotorcycle, faIndustry, faStore
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu, { MenuItem } from '../Menu/Menu';


// menuItems={menuItems}
// cart={cart}
// setCartItems={setCartItems}
// pos={true}
function AddItem(props) {
  var { menuItems, cart, setCartItems, pos } = props;

  const [currentEdit, setCurrentEdit] = useState("");

  const [currentName, setCurrentName] = useState("");
  const [brief, setBrief] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [status, setStatus] = useState("")
  // const [processing, setProcessing] = useState("");
  const [next, setNext] = useState(false)

  const nextStep = ()=> setNext(true)

  function getDateforSection() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const response = mm + '/' + dd + '/' + yyyy;

  return  response;
  }
  function getHoursandMins (){
    var today = new Date();
    var hours = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes() + 1).padStart(2, '0');
    const response = hours+":" +minutes;
    return response;
  }

  const saveChanges = () => {
    const dataUpdate = {
      "name": currentName,
      "image": status
    };
    DBservice.updateInventory(currentEdit, dataUpdate)
      .then(() => console.log("success"))
    // setCurrentEdit("");


  }

  useEffect(() => {
    editCard();
  }, [currentEdit])

  const editCard = () => {
    const tmp = menuItems.find((item) => item.id === currentEdit);
    if (!tmp) return

    setCurrentName(tmp.name);
    setStatus(tmp.image);
    setBrief(tmp.brief);
  };


  var fieldEdits = [currentName];
  var fieldActions = [setCurrentName]
  const fieldText = ["Producto a ingresar:"]


  return (
    <>
      {currentEdit !== "" ? (
        <div className="main">
          <br></br>
          <br></br>

          <br></br>
          <h1>{currentName}</h1>
          <h3>Producto en </h3>
          {status ==="FÁBRICA" &&           <h1 className="stud" ><b>fábrica </b></h1>
}
          {status ==="REPARTO" &&           <h1 className="stud" ><b>reparto</b></h1>
}
          {status ==="TIENDA" &&   <h1 className="stud" ><b>tienda </b></h1>
}
          <br></br>

          <br></br>

          <br></br>
         <Button className="status" onClick={()=>setStatus("FÁBRICA")}><FontAwesomeIcon icon={faIndustry} /></Button>
         <Button className="status" onClick={()=>setStatus("REPARTO")}> <FontAwesomeIcon icon={faMotorcycle} /></Button>
         <Button className="status" onClick={()=>setStatus("TIENDA")}><FontAwesomeIcon icon={faStore} /></Button>
        <br></br>
        <br></br>
        <br></br>
         { !next  ?
         (<>
         <Button pill inline className="save-1" theme="danger" onClick={() => {
            setCurrentEdit("")
          }}> <FontAwesomeIcon icon={faTimes} /></Button>
          <Button pill inline className="save-1" theme="success"
            onClick={() => { saveChanges(); setNext(true) }}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
          </>
          ):(
            <Button pill inline className="save" theme="success"
              onClick={() => {setNext(false); setCurrentEdit("")}}>
              Enviar notificación
            </Button>
          )
          }
        </div>)
        : (
          <>
            <br></br>
            <br></br>
            <div className="main">
            </div>   
        <Menu
        menuItems={menuItems}
        cart={cart}
        setCartItems={setCurrentEdit}
        pos={pos}
      ></Menu>
          </>
        )
      }
   
    </>
  )

}

export default AddItem;