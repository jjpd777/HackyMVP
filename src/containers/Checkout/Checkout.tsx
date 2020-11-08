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
const getDate=()=>{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  console.log(date);
  return date;
}
const getTime = ()=>{
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
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

  const [locindex, setLocation] = useState(0);
  const [name, setName] = useState("");
  const [responsibleUnit, setRespUnit] = useState("");
  const [place, setPlace] = useState("");
  const [work, setWork] = useState("");
  const [person, setPerson] = useState("");
  const [numberPeople, setNumberP] = useState("");

  const getHeader1 = () => [responsibleUnit,"INGETELCA S.A.", place, work , person, numberPeople];
  const canEmailPDF = ()=> getHeader1().map((val)=> val!=="" ? true: false);
  const sendIt = canEmailPDF().every(v=> v===true);

  const engineers = ["William", "Joel", "John", "Hugo"];

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
    const { width, height } = firstPage.getSize();

    let arrTEXT = getHeader1();
    var baseX = 205;
    var baseY = 339;

    arrTEXT.map((val) => {
      firstPage.drawText(val, {
        x: baseX,
        y: height / 2 + baseY,
        size: 7,
        font: helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
        // rotate: degrees(-45),
      })
      baseY -= 14;
    })
    const hourX = baseX + 310;
    const hourY = baseY + 14;
    firstPage.drawText(getTime(), {
      x: hourX,
      y: height / 2 + hourY,
      size: 7,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
      // rotate: degrees(-45),
    })
    const dateX = baseX + 195;
    const dateY = baseY + 14;
    firstPage.drawText(getDate(), {
      x: dateX,
      y: height / 2 + dateY,
      size: 7,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
      // rotate: degrees(-45),
    })
    var nptY = baseY + 42;
    var nptX = baseX + 310;
    firstPage.drawText("VAMOS", {
      x: nptX,
      y: height / 2 + nptY,
      size: 7,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
      // rotate: degrees(-45),
    })
    nptY = 65;
    nptX = 455;
    firstPage.drawText("Juan José Palacio", {
      x: nptX,
      y: nptY,
      size: 7,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
      // rotate: degrees(-45),
    })

    baseX = 72;
    baseY = 198;
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
    firstPage.drawText("No.174747", {
      x: 50,
      y: 800,
      size: 15,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      // rotate: degrees(-45),
    })

    const sign = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/Signature.png?alt=media&token=470a179b-02d2-4923-8deb-b0c7910631c9"

    const marioImageBytes = await fetch(sign).then(res => res.arrayBuffer());
    const marioImage = await pdfDoc.embedPng(marioImageBytes);
    const pngDims = marioImage.scale(0.08)
    firstPage.drawImage(marioImage, {
      x: 450,
      y: 40,
      width: pngDims.width,
      height: pngDims.height
    })

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
  }
  return (
    <div className="checkout-container">
      <img src="http://ingetelca.gt/wp-content/uploads/2011/07/logopeq.png" />
      <div className="order-summary">
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
          <h5>Ingeniero</h5>
          {engineers.map((val, key) =>
            <div className="finally">
              <FormRadio
                className="this-card"
                name="card"
                checked={locindex === key}
                onChange={() => {
                  setPerson(val);
                  setLocation(key);
                }}
              >
                {val}
              </FormRadio>
            </div>
          )}
          <div className="shipping-info">
            <h5>Llenar la siguiente info</h5>
            <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Unidad responsable"
              value={responsibleUnit}
              onChange={(e) => {
                setRespUnit(e.target.value);
              }}
            />
            <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Lugar de trabajo"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
             <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="Trabajo a realizar"
              value={work}
              onChange={(e) => {
                setWork(e.target.value);
              }}
            />
            <FormInput
              className="input"
              type="text"
              size="lg"
              placeholder="No. de personas"
              value={numberPeople}
              onChange={(e) => {
                setNumberP(e.target.value);
              }}
            />
            <Button onClick={props.onBack} className="button-secondary" outline block>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{'  '}Regresar al Menu
            </Button>
            { sendIt &&
            <Button
              onClick={() =>modifyPdf()}
              className="button" block>
              Enviar listado de inventario
            </Button>}
          </div>
        </div>
      ) || null}
      <br></br>
    </div>
  );
}

export default Checkout;
