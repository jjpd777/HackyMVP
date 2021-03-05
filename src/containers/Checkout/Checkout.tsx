import React, { useState, useEffect } from 'react';
import './Checkout.scss';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from "shards-react";
import firebase from 'firebase';
import { useList } from "react-firebase-hooks/database";


import {
  FormTextarea,
} from 'shards-react';
import {
  ListGroup,
  ListGroupItem,
  FormInput,
  FormRadio,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'shards-react';
import {
  faArrowAltCircleLeft,
  faTimesCircle,
  faCheckCircle,
  faMale
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
const getDate = () => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log(date);
  return date;
}
const getTime = () => {
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

const database = firebase.database();

function Checkout(props: CheckoutProps) {
  const { menuItems, cart } = props;

  const [locindex, setLocation] = useState(0);
  const [name, setName] = useState("");
  const [responsibleUnit, setRespUnit] = useState("");
  const [place, setPlace] = useState("");
  const [work, setWork] = useState("");
  const [person, setPerson] = useState("");
  const [engineers, setEngineers] = useState<any[]>([]);
  const [numberPeople, setNumberP] = useState("");
  const [fetchImage, setFetchImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [zone, setZone] = useState("");
  const [vehicleTraffic, setVehicle] = useState("");
  const [climate, setClimate] = useState("");
  const [special, setSpecial] = useState("");
  const [whatsApp, setWhatsApp] = useState(false)
  const [step1, setStep1] = useState(false);
  const [dbList, salesLoading, salesError] = useList(database.ref('/pointer'));
  const [listItems, setListItems] = useState();
  const [timer, setTimer]=useState(false);

  const [paulo, setPaulo]= useState(true);
  const [downloadURL, setDownloadURL] = useState("")


  const extraCallbacks = [setZone, setVehicle, setClimate, setSpecial];
  const extraFields = [zone, vehicleTraffic, climate, special];
  const extraText = ["Zona de la actividad", "Tráfico de vehículos", "Climatología", "Condiciones especiales"]
  const baseBRUH = paulo ? "https://api.whatsapp.com/send?phone=50240244953&" :"https://api.whatsapp.com/send?phone=50240192301&"

  useEffect(() => {
    //   // Call API to load the menu
    placeItems(dbList);
  }, [dbList]);

  const placeItems = (dboject) => {
    // if(dbSales) dbSales.map((val)=>console.log(val.val()))
    var length = 0
    const obj = dboject.map((tutorial) => tutorial.val());
    setListItems(obj.length);
  }
  const getHeader1 = () => [responsibleUnit, "INGETELCA S.A.", place, work, person, numberPeople];
  const canEmailPDF = () => getHeader1().map((val) => val !== "" ? true : false);
  const sendIt = canEmailPDF().every(v => v === true);
  const [redirectURL, setRedirect] = useState("");

  function todaysDate(){
    var today = new Date();
    var min = String(today.getMinutes()).padStart(2,'0');
    var hour = String(today.getHours()).padStart(2,'0');
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayEndpoint = yyyy+"/"+mm+"/"+dd+"/"
    var personName = person.split(' ').join('-')
    var response = todayEndpoint+hour + ':'+ min+"&"+personName;
    console.log(response)
    return response;
  }

  const engineersJSON = {
    "Rubén de Jesus Borja Martínez": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_1_2390229602.png?alt=media&token=cbca267c-0e39-4e4c-befe-3f0f277789b1",
    "Wilson Alexander Barillas Chajón": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_1_8338982172.png?alt=media&token=07085def-9f5d-469a-9c04-f0ae0d351e3e",
    "Audelino Samayoa Pérez": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_12_2243519646.png?alt=media&token=aab8d1e9-b3e1-4fd6-80df-5ffa8bc2f89f",
    "Henry Alexander Morán Lemus": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_7_3829281714.png?alt=media&token=5d3fd87b-6dcd-4bca-afe3-d2683119b96e",
    "Luis Alberto Gudiel Polanco": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_10_5830862428.png?alt=media&token=c86e709e-ee67-4eef-811b-3b86fbcffcbe",
    "Victor Manuel Reyes Rivera": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_4_5725059954.png?alt=media&token=bf8d0a1c-6041-40f9-bb98-40ee16a83327",
    "Edin Gilberto Borja Molina": "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_5_3004968665.png?alt=media&token=b551d73b-34ff-49f4-aae2-e4937aca16bf",
    "Manuel Borja":"https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_5_7993497549.png?alt=media&token=8f101e14-f957-4cd0-8861-b23dc811f9a1",
    "René de Jesús Pérez" : "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/imageedit_3_5673844416.png?alt=media&token=c3db2cd5-e522-4d23-b9b5-96f5a0388547",
    "Saúl Jiménez Sandoval" : "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/Saul-alejandro.png?alt=media&token=f527b2b9-b358-45fd-894e-5b19655d2214"
  };

  useEffect(() => {
    setEngineers(getKeys());
  }, [person]);


  // function replaceAll(str, find, replace) {
  //  return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
  //   }
  const getKeys = () => {
    let response: any[] = [];
    for (var eng in engineersJSON) response.push(eng);
    return response
  }

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
    firstPage.drawText("", {
      x: nptX,
      y: height / 2 + nptY,
      size: 7,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
      // rotate: degrees(-45),
    })
    nptY = 65;
    nptX = 455;
    firstPage.drawText(person, {
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
        if (val.id === cartItem.id || val.id === 32 || val.id === 33 || val.id === 34 || val.id === 35) {
          if (val.id === 32 && zone !== "") {
            firstPage.drawText(zone, {
              x: baseX + 180,
              y: height / 2 + baseY,
              size: 7,
              font: helveticaFont,
              color: rgb(0.1, 0.1, 0.1),
            })
          }
          else if (val.id === 33 && vehicleTraffic !== "") {
            firstPage.drawText(vehicleTraffic, {
              x: baseX + 180,
              y: height / 2 + baseY,
              size: 7,
              font: helveticaFont,
              color: rgb(0.1, 0.1, 0.1),
            })
          }
          else if (val.id === 34 && climate !== "") {
            firstPage.drawText(climate, {
              x: baseX + 180,
              y: height / 2 + baseY,
              size: 7,
              font: helveticaFont,
              color: rgb(0.1, 0.1, 0.1),
            })
          }
          else if (val.id === 35 && special !== "") {
            firstPage.drawText(special, {
              x: baseX + 180,
              y: height / 2 + baseY,
              size: 7,
              font: helveticaFont,
              color: rgb(0.1, 0.1, 0.1),
            })
          } else {
            if (!(val.id === 32 || val.id === 33 || val.id === 34 || val.id === 35)) {
              firstPage.drawText("x", {
                x: baseX,
                y: height / 2 + baseY,
                size: 10,
                font: helveticaFont,
                color: rgb(0.1, 0.1, 0.1),
              })
            }
          }
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
    // firstPage.drawText("No.174747", {
    //   x: 50,
    //   y: 800,
    //   size: 15,
    //   font: helveticaFont,
    //   color: rgb(0.95, 0.1, 0.1),
    //   // rotate: degrees(-45),
    // })

    const sign = fetchImage;
    const signImageBytes = await fetch(sign).then(res => res.arrayBuffer());
    const signImage = await pdfDoc.embedPng(signImageBytes);

    const getSizeAndLocation = () => {
      var xCoord = 430;
      var yCoord = 47;
      var resize = 0.5
      if (person === "Henry Alexander Morán Lemus") {
        xCoord = 420;
        resize = 0.2;
        yCoord = 60;
      }
      if (person === "Luis Alberto Gudiel Polanco") {
        xCoord = 430;
        resize = 0.15;
        yCoord = 40;
      }
      if (person === "Victor Manuel Reyes Rivera") {
        xCoord = 400;
        resize = 0.5;
        yCoord = 50;
      }
      if (person === "Edin Gilberto Borja Molina") {
        xCoord = 410;
        resize = 0.3;
        yCoord = 50;
      }
      if (person === "Manuel Borja") {
        xCoord =410;
        resize = 0.3;
        yCoord = 67;
      }
      if (person === "René de Jesús Pérez") {
        xCoord =410;
        resize = 0.15;
        yCoord = 60;
      }
      if (person === "Saúl Jiménez Sandoval") {
        xCoord =430;
        resize = 0.25;
        yCoord = 35;
      }
      return [resize, xCoord, yCoord]
    }
    const sizeAndLocation = getSizeAndLocation();
    const pngDims = signImage.scale(sizeAndLocation[0])
    firstPage.drawImage(signImage, {
      x: sizeAndLocation[1],
      y: sizeAndLocation[2],
      width: pngDims.width,
      height: pngDims.height
    })

    const pdfBytes = await pdfDoc.save();
    var storageRef = firebase.storage().ref();
    const stringDate = todaysDate();
    // const name1 = person.split(' ').join('-')
    // console.log(name1)
    var file2write = storageRef.child(stringDate+'.pdf')

    file2write.put(pdfBytes).then(function (snapshot) {
      
      file2write.getDownloadURL().then(function (url) {
        setTimer(true);
        setDownloadURL(url);
        var fetchthatbitch = url;
        var whatsAppBase = baseBRUH +"text=Buenas%20ingeniero%0A%0AEste%20es%20el%20enlace%20al%20reporte%20%0A%0A"
        const craftString = (message) => {
  
          message = message.split("%").join("%25")
          message = message.split("&").join("%26")
          message = message.split("=").join("%3D")
          message = message.split("?").join("%3F")
          message = message.split("#").join("%23")
          message = message.split(":").join("%3A")
          message = message.split("/").join("%2F")
          console.log(message)
          return message;
        }
        whatsAppBase += craftString(fetchthatbitch);
        setRedirect(whatsAppBase);
      })
     
    });
  }

  return (
    <div className="checkout-container">
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
      {true && <Dropdown open={modalOpen} toggle={() => setModalOpen(!modalOpen)} className="drop-down">
        <DropdownToggle className="button" split><b>{person !== "" ? person : "Técnico encargado"}</b></DropdownToggle>
        <DropdownMenu >
          {engineers.map((engineer, key) =>
            <DropdownItem
              onClick={() => {
                setPerson(engineer);
                setLocation(key);
                setFetchImage(engineersJSON[engineer]);
                setStep1(true);
              }} >
              <FontAwesomeIcon icon={faMale} /> {' '} {engineer}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>}
      <Button onClick={props.onBack} className="button-secondary" outline block>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{'  '}Editar elementos
            </Button>

      {step1 && (
        <div className="store-location" >
          {/* <h5>Enviar a:</h5> */}
          {/* <FormRadio onChange={()=>setPaulo(true)} onClick={()=>setPaulo(true)}checked={paulo}>Ing. Paulo</FormRadio>
          <FormRadio onChange={()=>setPaulo(false)} onClick={()=>setPaulo(false)}  checked={!paulo}>Ing. William</FormRadio> */}
          <br></br>
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
            <h6><b>(requerido)</b></h6>
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
            <h6><b>(requerido)</b></h6>
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
            <h6><b>(requerido)</b></h6>
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
                            <h6><b>(requerido)</b></h6>
            <br></br>
            <h5>Condiciones del Entorno</h5>
            {extraFields.map((field, key) =>
              <>
                <br></br>
                <p>{extraText[key]}</p>
                <FormInput
                  className="input"
                  value={field}
                  onChange={(e) => {
                    extraCallbacks[key](e.target.value)
                  }} >
                </FormInput>
              </>
            )
            }
            {!whatsApp && sendIt &&
              <Button
                theme="warning"
                onClick={() => { modifyPdf(); setWhatsApp(!whatsApp); }}
                className="button-pdf">
                GENERAR PDF
            </Button>}
            {whatsApp && timer && 
            <>
             {/* <Button
              theme="success"
              href={redirectURL}
               block>
                               ENVIAR VIA WHATSAPP
            </Button> */}
            <Button
              theme="success"
              href={downloadURL}
              className="button" block>
                              Descargar PDF
            </Button>
              </>
          }
            {!timer && whatsApp && <Button className="wait-button" >Por favor un momento</Button>}
          </div>
        </div>
      ) || null}
      <br></br>
    </div>
  );
}

export default Checkout;
