import React, { useEffect, useState } from 'react';
import {
  FormTextarea,
} from 'shards-react';
import DBservice from '../../services/DBservice'

import { Button } from 'shards-react';
import './AddItems.scss'
import {
  faCashRegister, faCheckCircle, faTimes, faStoreAlt, faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu, { MenuItem } from '../Menu/Menu';


// menuItems={menuItems}
// cart={cart}
// setCartItems={setCartItems}
// pos={true}
function AddItem(props) {
  var { menuItems, cart, setCartItems, pos } = props;
  const [avTicket, setAvTicket] = useState(0);
  const [title, setTitle] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");

  const [currentName, setCurrentName] = useState("");
  const [currentQuantity, setCurrentQ] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  function getDateforSection() {
    var date = new Date();
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

  }
  const saveChanges = () => {
    const dataUpdate = {
      "name": currentName,
      "price": currentPrice,
      "quantityavailable": currentQuantity
    };
    DBservice.updateInventory(currentEdit, dataUpdate)
      .then(() => console.log("success"))
    setCurrentEdit("");


  }

  useEffect(() => {
    editCard();
  }, [currentEdit])

  const editCard = () => {
    const tmp = menuItems.find((item) => item.id === currentEdit);
    if (!tmp) return

    setCurrentName(tmp.name);
    setCurrentQ(tmp.quantityavailable);
    setCurrentPrice(tmp.price);
  };



  var fieldEdits = [currentName, currentQuantity, currentPrice];
  var fieldActions = [setCurrentName, setCurrentQ, setCurrentPrice]
  const fieldText = ["Nombre", "Unidades disponibles", "Precio del producto (Qtz.)"]



  return (
    <>
      {currentEdit !== "" ? (
        <div className="main">
          <br></br>
          <h3 className="stud" ><b>Producto a editar: </b></h3>

          {fieldEdits.map((val, key) =>
            <>
              <h4>{fieldText[key]}</h4>
              <FormTextarea
                className="input"
                //  placeholder={val}
                value={val}
                onChange={(e) => {
                  fieldActions[key](e.target.value);
                }
                }
              />
            </>
          )}

          <Button pill inline className="save-1" theme="danger" onClick={() => {
            setCurrentEdit("")
          }}> <FontAwesomeIcon icon={faTimes} /></Button>
          <Button pill inline className="save-1" theme="success"
            onClick={() => { saveChanges() }}>
            <FontAwesomeIcon icon={faCheckCircle} /></Button>
        </div>)
        : (
          <>
            <br></br>
            <br></br>
            <h1> <FontAwesomeIcon icon={faStoreAlt} /></h1>
            <h2>Editar inventario</h2>
            <div className="main">
              <h3><FontAwesomeIcon icon={faArrowDown} /><FontAwesomeIcon icon={faArrowDown} /><FontAwesomeIcon icon={faArrowDown} /></h3>
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