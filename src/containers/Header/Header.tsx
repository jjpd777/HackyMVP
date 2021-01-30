import React, { useEffect, useState } from 'react';
import './Header.scss'
import { DateforSection } from '../../services/DBservice';
import listoLogo from '../../logo_v22.png';
import fireLogo from '../../refurbished-logo.png'
import felLogo from '../../fel-rm.png';
import wazup from '../../wzup.png';
import dopy from '../../dopezt.jpeg';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Button,
} from 'shards-react';

import {
  faCamera,
  faGlasses,
  faStopwatch,
  faHammer,
  faMousePointer,
  faCheckCircle, faPhone, faEye, faPager, faPrint,
  faHandPointer,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(){
  const currentDate = DateforSection().split('/')[0];
  const tmp="https://dribbble.com/shots/3633228-Avanti-e-indietro-loader/attachments/3633228-Avanti-e-indietro-loader?mode=media"

return (
  <div className="description-header">
    <div>
    <img className="listo-logo" src={fireLogo} />
    </div>
        {/* <div className="tagline">Facturación por WhatsApp</div>] */}
        <img className="fel-logo" src={felLogo} />
        <img className="wazup-logo" src={wazup} />
        <div className="selling-prop">
        <h4> Facturación por WhatsApp en segundos.</h4>
        <h4>- - -</h4>
        </div>
      
        <div className="selling-points">
          <h5>
          <FontAwesomeIcon className="icon" icon={faCheckCircle}/>{' '} Con cualquier celular ó PC
          </h5>   
          <h5>
          <FontAwesomeIcon className="icon" icon={faPrint}/>{' '} No requiere impresora
          </h5>
          <h5>
          <FontAwesomeIcon className="icon" icon={faFilePdf}/>{' '} PDF descargable
          </h5>  
          <h5>
          {/* <Switch>
            <Route exact path={["/previas"]}>
              <PreviousInventory/>
            </Route>
          </Switch> */}
          <Link to="/demo">
            <Button className="view-demo" pill > Demostración <FontAwesomeIcon className="check-it" icon={faEye}/></Button>
          </Link>
          </h5>
          <img className="dopy" src={dopy} />
          <h4>
          ¿Qué incluye?
          </h4>
          <h5>
          <FontAwesomeIcon className="icon" icon={faGlasses}/>{' '} Asesoría tributaria incluída
          </h5>
          <h5>
          <FontAwesomeIcon className="icon" icon={faPhone}/>{' '} Soporte técnico 24/7
          </h5>   
        </div>

  </div>
  );
}

export default Header;