import React, { useEffect, useState } from 'react';
import {
  FormTextarea, FormInput
} from 'shards-react';
import DBservice, { InventoryDB } from '../../services/DBservice'

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

  const {updateInventory} = InventoryDB();
  var { menuItems, cart, setCartItems, pos } = props;
  const [currentEdit, setCurrentEdit] = useState("");
  const [priorInfo, setPriorInfo] = useState()
  const [currentName, setCurrentName] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentCat, setCurrentCat] = useState("");
  
  const saveChanges = () => {
    const dataUpdate = {
      "name": currentName,
      "price": currentPrice,
      "category": currentCat
    };
    const record = {
      "prior": priorInfo,
      "new" : dataUpdate
    };

    updateInventory(currentEdit, dataUpdate).catch(e=>console.log(e));
    DBservice.changesLog(record);
    setCurrentEdit("");
    setPriorInfo();


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
    setPriorInfo(tmp)
  };

  return (
    <>
      {currentEdit !== "" ? (
        <div className="main">
          <br></br>
          <FormInput
            className="input-Edit"
            value={currentCat}
            onChange={(e) => {
              setCurrentCat(e.target.value);
            }}
          />
          <FormInput
            className="input-Edit"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
          <FormInput
            className="input-Edit"
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