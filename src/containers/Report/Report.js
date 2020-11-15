import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
import './Report.scss' 
import {
    faCashRegister,
    faEnvelope,
    faMoneyBill,
    faCreditCard,
    faSearchDollar,
    faMoneyBillAlt,
    faCoins,
    faMoneyBillWave
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Report(props) {
    const { salesItems } = props;
    const [avTicket, setAvTicket] = useState(0);
    const [avCard, setAvCard] = useState(0);
    const [avCash, setAvCash] = useState(0);
    const [redirectURL, setRedirect] = useState("");

    function getDateforSection() {
        var date = new Date();
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    }


    useEffect(() => {
        getStats();
        ticketsReport();
        closeSalesDay();
    },[salesItems])

    // useEffect(()=>setRefresh(!refresh),[salesItems])

    const closeSalesDay = () => {
        var baseURL = "https://wa.me/525541662894+?text=";
        const welcome = "Buenos días de *Borgoña Comercia*,"
        const totalSales = "%0A%0AEl dia de hoy *" + getDateforSection() + "* el total de ventas fué: *Qtz. " + String(avCash + avCard)+"*";
        const ticketText = "%0A%0AEl ticket promedio fué de: *Qtz. " + String(avTicket) + "*"
        const numCardText = "%0A%0AVentas en tarjeta: *Qtz" + avCard + "*";
        const numCashText = "%0A%0AVentas en efectivo: *Qtz" + avCash + "*";
        const resp = welcome + totalSales + ticketText + numCardText + numCashText;
        const response = resp.split(" ").join("%20");
        const send = baseURL + response;
        setRedirect(send);
    }

    const ticketsReport = () => {
        var active = 0;
        var cancelled = 0;
        const today = getDateforSection();
        var salesToday = salesItems.filter((item)=> item.category ===today)
        salesToday.map((val) => val.valid ? active++ : cancelled++);
    }
    const getStats = () => {
        var salesTotal = 0;
        var cardTotal = 0;
        var cashTotal = 0;
        const today = getDateforSection();
        var salesToday = salesItems.filter((item)=> item.category ===today && item.valid)
        salesToday.map((val, key) => {
            if (val.valid) {
                salesTotal += val.total
                if (val.payment === "tarjeta") cardTotal += val.total;
                else cashTotal += val.total;
            }
        })

        const ticket = (salesTotal / salesToday.length);
        const tmp = (Math.round(ticket * 100) / 100).toFixed(2)
        const result = parseFloat(tmp);
        setAvCard(cardTotal);
        setAvCash(cashTotal);
        setAvTicket(result);
    }
    return (
        <>
            {!avTicket ? (
                <div className="main">
                    <h5>Ventas de hoy: {getDateforSection()}</h5>
                    <h3 className="stud" ><b>Todavía no hay ventas </b></h3>
                </div>)
            : (

                <div className="main">
                    <br></br>
                    <br></br>
                    <h5>Ventas de hoy: {getDateforSection()}</h5>
                    {/* {setRefresh(!refresh)} */}
                    <h6><b>Ticket promedio:</b></h6>
                    <h3 className="stud" ><b>Q.</b>{avTicket} / ticket</h3>
                    <h6><b>total vendido:</b></h6>
                    <h3 className="stud" > Qtz.{avCash + avCard}</h3>
                    <h6><b>Tarjeta</b>{' '}<FontAwesomeIcon icon={faCreditCard}/> Q.{avCard}</h6>
                    <h6><b>Efectivo</b>{' '}<FontAwesomeIcon icon={faMoneyBillWave}/>: Q.{avCash}</h6>
                    <br></br>
                    <Button theme="warning" href={redirectURL} onClick={closeSalesDay} ><FontAwesomeIcon icon={faEnvelope}/>{'  '}Enviar cierre de caja</Button>
                </div>)
            }
        </>
    )

}

export default Report;