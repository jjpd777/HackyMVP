import React, { useEffect, useState } from 'react';
import {
    Button,
  } from 'shards-react';
import {
    ListGroup,
    ListGroupItem,
    FormInput,
    FormRadio,
  } from 'shards-react';
  
import './CreateTemplate.scss';

import {
    faArrowAltCircleLeft,
    faTimes,
    faCheckCircle,
    faPencilAlt
  } from '@fortawesome/free-solid-svg-icons';

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function CreateTemplate() {
    const [personInCharge, setPersonInCharge] = useState("")

      
    return (
    <div className="create-template-container">
        <div className="create-input-fields">
        <h1>Registrar Inventario <FontAwesomeIcon icon={faPencilAlt}/></h1>
        {/* <h1> </h1> */}

        <h5> Categoría</h5>
        <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Escribir categoría"
              // value={additionalNotes}
              onChange={(e) => {
                setPersonInCharge(e.target.value);
              }}
            />

        <h5> Nombre producto</h5>
        <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Escribir nombre"
              // value={additionalNotes}
              onChange={(e) => {
                setPersonInCharge(e.target.value);
              }}
            />
                    <h5> Precio</h5>

        <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Qtz."
              // value={additionalNotes}
              onChange={(e) => {
                setPersonInCharge(e.target.value);
              }}
            />
        </div>
        <div className="wrap-up-actions">
              <Button className="decline"> <FontAwesomeIcon icon={faTimes}/> </Button>
              <Button className="accept"> <FontAwesomeIcon icon={faCheckCircle}/></Button>
        </div>
       <h1>- - -</h1>
    </div>

    )

}

export default CreateTemplate;