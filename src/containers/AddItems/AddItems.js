import React, { useEffect, useState } from 'react';
import {
    FormTextarea,
  } from 'shards-react';

import { Button } from 'shards-react';
// import './Report.scss' 
import {
    faCashRegister,
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu, { MenuItem } from '../Menu/Menu';


// menuItems={menuItems}
// cart={cart}
// setCartItems={setCartItems}
// pos={true}
function AddItem(props) {
    var {menuItems,cart,setCartItems,pos}=props;
    const [avTicket, setAvTicket] = useState(0);
    const [title, setTitle] = useState("");

    function getDateforSection() {
        var date = new Date();
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    }



    return (
        <>
            {!avTicket ? (
                
                <div className="main">
                    <h5>Ventas de hoy: {getDateforSection()}</h5>
                    <h3 className="stud" ><b>Todavía no hay ventas </b></h3>
                    <FormTextarea
                className="input"
                placeholder="Número de NIT"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
                    <Menu
                  menuItems={menuItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={true}
                ></Menu>
                </div>)
            : (

                <div className="main">
                <Menu
                  menuItems={menuItems}
                  cart={cart}
                  setCartItems={setCartItems}
                  pos={true}
                ></Menu>
                </div>)
            }
        </>
    )

}

export default AddItem;