import React, { useState } from "react";
import {
    FormTextarea,
    InputGroup,
    InputGroupAddon,
    FormInput,
    InputGroupText,
    Button,
    Card,
    CardBody,
    CardTitle,
} from 'shards-react';
import {
   
} from 'shards-react';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import './Excell.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBook, faCreditCard, faArrowLeft,
    faGlasses, faMoneyBillAlt,faPhoneSquare,
    faFileExcel,
    faClock
} from "@fortawesome/free-solid-svg-icons";
const craftString = (message) => {
  
    message = message.split("%").join("%25")
    message = message.split("&").join("%26")
    message = message.split("=").join("%3D")
    message = message.split("?").join("%3F")
    message = message.split("#").join("%23")
    message = message.split(":").join("%3A")
    message = message.split("/").join("%2F")
    console.log(message, "MESSAGE")
    return message;
}
const xlxURL = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/reporte-listosoftware.xlsx?alt=media&token=ce7d3631-8a94-4d02-90d1-90ae58c29440"

const stringHelper = (x)=> x.split(" ").join("%20")
function Excell (props){
    const {navHelper} = props;
    const [loaded, setLoaded] = useState(false);
    const [isGenerating, setGenerating] = useState(false);
    const [exe, setExcel] = useState(false);
    const timerBruh = ()=> {
        setGenerating(true);
        setTimeout(() => {  setLoaded(true); setGenerating(false) }, 2000)
    };
    const returnURLmessage = ()=>{
        const baseURL = "https://api.whatsapp.com/send?phone=50237611110&text="
        const message = stringHelper("Buenos días *Licenciado Rodríguez*,%0A%0APor este medio le envío *el reporte en Excel del mes de enero*.")
        const goodby = stringHelper("%0A%0AQuedo atento a cualquier duda o comentario. %0A%0AGracias de antemano,%0A%0A*Juan J. Palacio*");
        const report = stringHelper("%0A%0A *REPORTE EN EXCEL DESCARGABLE*%0A")
        const reportURL = craftString(xlxURL);
        const rsp = baseURL + message + goodby + report + reportURL;
        return rsp;

    }
    const showExcel = ()=> setExcel(!exe); ///37611110 
    return(
        <>
        <div onClick={()=> showExcel()}className="report-card">
            <Card>
                <CardBody>
                    <CardTitle className="accounting-header">
                        <h2>Qtz. 8,750</h2>
                    </CardTitle>
                    {/* <h3>Resumen <FontAwesomeIcon icon={faGlasses}/></h3> */}
                    <h4>Enero 2021</h4>
                    <h3 className="av-tickt"> Qtz.175.00 <b>/ factura</b></h3>
                <h5><b>50</b> facturas en enero</h5>
                <h5><b>4 </b>facturas anuladas</h5>
                <h2>- - -</h2>
                <h5><FontAwesomeIcon icon={faCreditCard}/>  <b>Qtz.</b>6,520 tarjeta</h5>
                <h5><FontAwesomeIcon icon={faMoneyBillAlt}/> <b>Qtz.</b>2,230 efectivo</h5>
                </CardBody>
            </Card>
            </div>
          { exe &&  <div>
            {!loaded && !isGenerating && <Button onClick={timerBruh} className="excell-btn"> Resumen Excel <FontAwesomeIcon className="exe" icon={faFileExcel}/></Button>}
            {!loaded && isGenerating && <Button className="generating-btn"> Generando Excel <FontAwesomeIcon className="exe" icon={faClock}/></Button>}
            {loaded && <Button href={xlxURL} className="excell-btn"> Descargar <FontAwesomeIcon className="exe" icon={faFileExcel}/></Button>}
           {loaded && <Button href={returnURLmessage()} className="wzp"> Whatsapp <FontAwesomeIcon  className="exe"  icon={faPhoneSquare}/></Button> }
            </div>}
            <Button className="go-back" onClick={()=>navHelper("")}> <FontAwesomeIcon icon={faArrowLeft}/>Regresar </Button>
        </>

    )
}

export default Excell;