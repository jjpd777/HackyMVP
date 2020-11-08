import React, { useState } from 'react';
import './Checkout.scss';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from "shards-react";
import firebase from 'firebase';

import {
  FormTextarea,
} from 'shards-react';
import {
  ListGroup,
  ListGroupItem,
  FormInput,
  FormRadio,
} from 'shards-react';
import {
  faArrowAltCircleLeft,
  faTimesCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../App';
import { MenuItem } from '../Menu/Menu';
const download = require("downloadjs");


interface CheckoutProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  totalCartValue: number;
  onBack: () => void;
}

const firebaseConfig = {
  apiKey: "AIzaSyAcCtzvRGCUQJ4smMF14uKmelpYmGW6zTU",
  authDomain: "fir-finallyjuan.firebaseapp.com",
  databaseURL: "https://fir-finallyjuan.firebaseio.com",
  projectId: "firebasefinallyjuan",
  storageBucket: "firebasefinallyjuan.appspot.com",
  messagingSenderId: "33788123767",
  appId: "1:33788123767:web:2ef92fa41787d4c9810472"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const [locindex, setLocation] = useState(0);

  const engineers = ["Plaza Gerona", "Plaza Comercia", "Plaza Novitá", "Condado Fraijanes", "Plazoleta"];
  const minPaymentAmount = props.totalCartValue > 0;

  const getCartItems = () => {
    let cartItems: any[] = [];
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          cartItems.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: cartItem.quantity,
          });
        }
      });
    });
    return cartItems;
  };
  async function modifyPdf() {
    const url = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/SEGURIDAD-INDUSTRIAL.pdf?alt=media&token=7c665e8a-f302-4552-b96a-bbcdc7ad042c"
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    console.log(width, height)

    // let arrTEXT = ["Mantenimiento","INGETELCA S.A.","Zanarate","Levantamiento de postes",props.name,"5"];
    var baseX = 72;
    var baseY = 198;
    const cartthing = getCartItems();
    menuItems.map((val) => {
      if (val.id === 36) { baseX = 328; baseY = 198 }
      cartthing.map((cartItem, ix) => {
        if (val.id === cartItem.id) {
          firstPage.drawText("x", {
            x: baseX,
            y: height / 2 + baseY,
            size: 10,
            font: helveticaFont,
            color: rgb(0.1, 0.1, 0.1),
            // rotate: degrees(-45),
          })
        }
      })

      if (val.id === 7 || val.id === 8 || val.id == 42 || val.id == 43) { baseY -= 15 }
      else if (val.id === 9 || val.id == 44) { baseY -= 35 }
      else if (val.id === 18) { baseY -= 32 }
      else if (val.id === 53) { baseY -= 36 }
      else if (val.id === 31) { baseY -= 34 }

      else {
        if (59 > val.id && val.id > 43) baseY -= 11;
        else if (val.id > 58) baseY -= 12
        else baseY -= 11.5;
      }
    })
    const pdfBytes = await pdfDoc.save()
    console.log(pdfBytes);
    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
  }
  const write2PDF = () => getCartItems().map((item, key) => item.quantity > 0 ? true : false);

  return (
    <div className="checkout-container">
      <img src="https://scontent.fgua5-1.fna.fbcdn.net/v/t1.0-9/60454009_2403050509745003_1658534653943873536_o.png?_nc_cat=108&_nc_sid=85a577&_nc_ohc=E2i8isONLjYAX8WoHjo&_nc_ht=scontent.fgua5-1.fna&oh=aac791af829983b21b70abcdffb419e5&oe=5FB542FE" />
      <div className="order-summary">
        <Button onClick={() => modifyPdf()}>Hi</Button>
        <ListGroup>
          {getCartItems().map((item, index) => {
            return (
              <ListGroupItem className="list-item" key={index}>

                {item.quantity > 0 && <div><FontAwesomeIcon icon={faCheckCircle} /> {'  '}{item.name}  </div>}


              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
      <br />

      {true && (
        <div className="store-location" >
          <h5>Localidad</h5>
          {engineers.map((val, key) =>
            <div className="finally">
              <FormRadio
                className="this-card"
                name="card"
                checked={locindex === key}
                onChange={() => {
                  setLocation(key);
                }}
              >
                {val}
              </FormRadio>
            </div>
          )}
          <div className="shipping-info">
            <h5>Notas adicionales:</h5>
            <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Escribir notas"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button onClick={props.onBack} className="button-secondary" outline block>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{'  '}Regresar al Menu
      </Button>
            <Button
              onClick={() => console.log("success")}
              className="button" block>
              Enviar listado de inventario
            </Button>
          </div>
        </div>
      ) || null}
      <br></br>
    </div>
  );
}

export default Checkout;
