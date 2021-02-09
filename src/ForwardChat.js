import React, { useEffect, useState } from 'react';
import {
    Button,
    Card, CardBody,
    CardTitle, FormInput,
    InputGroup, InputGroupAddon,
    FormTextarea, InputGroupText
} from 'shards-react';
import './ForwardChat.scss';
import platica from './platicame-redesign.png'
import {
    faChessRook,
    faCamera,
    faEnvelope, faVolumeUp, faPencilAlt, faPhoneAlt, faGlasses
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlaticameDB, newMHDMY } from './services/DBservice';
const craftString = (message) => {
    var hashtag = /#/gi;
    var x = message.split(" ").join("%20");
    x = x.split("\n").join("%0A")
    // message = message.replace(hashtag, "%23")
    // message = message.replace(":", "%3A")
    // message = message.replace(hashtag, "%20")
    return x;
}


function ForwardWhatsApp() {
    const BASEMESSAGE = "*Facturación  por WhatsApp*\n\nBuenos días nuestro software ofrece:\n\n"+
    "=> Envío de  facturas electrónicas *en PDF por WhatsApp*\n"+
    "=> Envío de reporte al contador *en Excel por WhatsApp*\n" +
    "=> Almacenamiento de *PDFs en la nube*\n\n"+
    "¿Le gustaría ver un video de demostración?";

    const [message, setMessage] = useState(BASEMESSAGE);
    const [phone, setPhone] = useState("");
    const { insertRequest } = PlaticameDB();
    const [redirect, setRedirect] = useState("");
    const [revision, setRevision] = useState(false);

    const x = {
        message: message,
        phoneNumber: phone,
        timestamp: newMHDMY(),
    };


    const craftURL = () => {
        if (phone === "") return;

        setRevision(true);
        const parseText = craftString(message);
        setRedirect("https://wa.me/" + country[1] + phone + "?text=" + parseText);
    };

    const countries = [["🇲🇽","+52"],["🇬🇹", "+502"],["🇧🇿", "+501"],["🇸🇻","+503"],["🇭🇳","+504"], ["🇨🇴", "+57"],["🇵🇷", "+1"], ["🇺🇸","+1"], ["🇪🇸","+34"]]
    const [countriesPTR, setPTR] = useState(0);
    const [country, setCountry] = useState(countries[1]);
  
    const checkoutText = revision ? "WhatsApp" : "Revisar"

    return (
        <div className="palacio">
            <div>
                <img className="platica-logo" src={platica} />
            </div>
            <div className="sub-header-text" onClick={() => "listosoftware.web.app/"} >
                <h6  >Impulsado por</h6>
                <Button className="link" href={"https://listosoftware.web.app/"}> Listo Software</Button>
            <div className="flags">
                {countries.map((x, ix)=><h2 onClick={()=>setCountry(countries[ix]) }> {x[0]}</h2>)}
            </div>
            </div>
            {/* <div className="country-div">

                <Button className="country" onClick={() => nextCountry()}> {country[0]} {country[1]}</Button>
            </div> */}
           {!revision && <Card className="t-card">
                <CardBody>
                <div>
                        <h4>Celular destino:</h4>
                        <InputGroup className="mb-2">
                            <InputGroupAddon type="prepend">
                                <InputGroupText size="lg" className="prepend">{country[1]}</InputGroupText>
                            </InputGroupAddon>
                            <FormInput 
                            className="input"
                            type="number"
                            size="lg"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            />
                        </InputGroup>
                    </div>
                    <h4>Mensaje a mandar:</h4>
                    <FormTextarea
                        className="input-message"
                        type="text"
                        size="lg"
                        placeholder={"Escribe acá tu mensaje."}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                
                </CardBody>
            </Card>}
            {revision && <div>
                <Card className="t-card">
                    <CardBody>
                        <h4>Destino: </h4><h3><b>{country[1]}</b>{' '}{phone}</h3>
                        <h4>Mensaje: </h4><h3>{message}</h3>
                    </CardBody>
                </Card>
                <Button className="edit" onClick={() =>{ setRevision(false) ; setRedirect("")}}>  <FontAwesomeIcon icon={faPencilAlt} /> Editar</Button>
                
            </div>}
            <Button className="send" onClick={()=> revision ? insertRequest(x) : craftURL() } href={redirect}> <FontAwesomeIcon icon={revision ? faPhoneAlt: faGlasses} /> {checkoutText} </Button>
        </div>
    )

}
export default ForwardWhatsApp;
