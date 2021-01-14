import React, { useEffect, useState } from 'react';
import {
    FormTextarea,
    InputGroup,
    InputGroupAddon,
    FormInput,
    InputGroupText,
    Button
} from 'shards-react';

import {
    faPuzzlePiece,
    faLightbulb
  } from '@fortawesome/free-solid-svg-icons';

import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const craftString = (message) => {
    var hashtag = /#/gi;
    message = message.replace(hashtag, "%23")
    message = message.replace(":", "%3A")
    message = message.replace(hashtag, "%20")
    return message;
  }

function Footer() {
    const [question, setQuestion] = useState("");
    const redirectHelper = ()=>{
       const whatsAppRedirect = "https://wa.me/50251740464?text=";
       return whatsAppRedirect + craftString(question);
    };

    return (
        <div className="collect-info">
            <h2> - - -</h2>
            <h2>Pregúnta lo que quieras!</h2>
            <InputGroup className="field">
                {/* <InputGroupAddon type="prepend">
                    <InputGroupText>Quiero saber más sobre:</InputGroupText>
                </InputGroupAddon> */}
                <FormInput placeholder="Quiero saber más sobre..." 
                onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
                <InputGroupAddon type="append">
                    <Button href={redirectHelper()} theme="secondary">Enviar</Button>
                </InputGroupAddon>
            </InputGroup>
            <h5> Impulsado por Listo Software <FontAwesomeIcon icon={faLightbulb}/></h5>
        </div>
    )
}

export default Footer;