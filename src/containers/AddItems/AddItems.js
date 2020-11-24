import React, { useEffect, useState } from 'react';
import {
  FormTextarea, FormInput
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
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentCat, setCurrentCat] = useState("");

  function getDateforSection() {
    var date = new Date();
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

  }
  const saveChanges = () => {
    const dataUpdate = {
      "name": currentName,
      "price": currentPrice,
      "category": setCurrentCat
    };
    DBservice.updateInventory(currentEdit, dataUpdate).catch(e=>console.log(e));
    setCurrentEdit("");


  }

  useEffect(() => {
    editCard();
  }, [currentEdit])

  const editCard = () => {
    const tmp = menuItems.find((item) => item.id === currentEdit);

    if (!tmp) return
    setCurrentCat(tmp.category)
    setCurrentName(tmp.name);
    setCurrentPrice(tmp.price);
  };

  return (
    <>
      {currentEdit !== "" ? (
        <div className="main">
          <br></br>
          <FormInput
            className="input"
            value={currentCat}
            onChange={(e) => {
              setCurrentCat(e.target.value);
            }}
          />
          <FormInput
            className="input"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
          <FormInput
            className="input"
            type="number"
            value={currentPrice}
            onChange={(e) => {
              setCurrentPrice(e.target.value);
            }}
          />
          <div className="detail">
            <h3><b>(precio en Quetzales)</b></h3>
          </div>

          <Button pill inline className="save-1" theme="danger" onClick={() => {
            setCurrentEdit("")
          }}> <FontAwesomeIcon icon={faTimes} /></Button>
          <Button pill inline className="save-1" theme="success"
            onClick={() => { saveChanges() }}>
            <FontAwesomeIcon icon={faCheckCircle} /></Button>
        </div>)
        : (
          <div className="main">
            <Menu
              menuItems={menuItems}
              cart={cart}
              setCartItems={setCurrentEdit}
              pos={pos}
            ></Menu>
          </div>
        )
      }

    </>
  )

}

export default AddItem;