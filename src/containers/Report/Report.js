import React, { useEffect, useState } from 'react';

import { Button } from 'shards-react';
import './Report.scss' 
import {
    faCashRegister,
    faEnvelope,
    faBalanceScale,
    faMoneyBill,
    faCreditCard,
    faSearchDollar,
    faMoneyBillAlt,
    faCoins,
    faMoneyBillWave
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "shards-react";


function Report(props) {
    const { salesItems } = props;
    const [avTicket, setAvTicket] = useState(0);
    const [avCard, setAvCard] = useState(0);
    const [avCash, setAvCash] = useState(0);
    const [redirectURL, setRedirect] = useState("");
    const [ticketNum, setTicket] = useState(0);
    const [dropDown, setDropDown]= useState(false);
    const [reportDate, setReportDate] = useState("24-11-2020")


    function getDateforSection() {
        var date = new Date();
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    }
    function getDatesforButton() {
        var date = new Date();
        var datesArray = [];
        for(var i=0; i<7 ; i++) datesArray.push(date.getDate()-i + "-" + (date.getMonth() + 1) + "-" + date.getFullYear())
        return datesArray;
    }

    // useEffect(()=> setReportDate(getDateforSection()))
    useEffect(() => {
        getStats();
        ticketsReport();
        closeSalesDay();
    },[salesItems, reportDate])

    // useEffect(()=>setRefresh(!refresh),[salesItems])

    const closeSalesDay = () => {
        var baseURL = "https://wa.me/50249502142?text=";
        const welcome = "Buenas de *Borgoña Gerona*,"
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
        const today = reportDate;
        var salesToday = salesItems.filter((item)=> item.category ===today)
        salesToday.map((val) => val.valid ? active++ : cancelled++);
    }
    const getStats = () => {
        var salesTotal = 0;
        var cardTotal = 0;
        var cashTotal = 0;
        var tickets = 0;
        const today = reportDate;
        var salesToday = salesItems.filter((item)=> item.category ===today && item.valid)
        salesToday.map((val, key) => {
            if (val.valid && val.taxInfo!=="EGRESO") {
                salesTotal += val.total
                tickets++;
                if (val.payment === "tarjeta") {
                    cardTotal += val.total;
                }
                else cashTotal += val.total;
            }
            setTicket(tickets)
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
       <Dropdown className="date-container" open={dropDown} toggle={()=> setDropDown(!dropDown)} group>
        <Button className="date-button">{reportDate}</Button>
        <DropdownToggle split />
        <DropdownMenu>
            {getDatesforButton().map((date)=>
                <DropdownItem className="drop-item" onClick={()=>setReportDate(String(date))}>{date}</DropdownItem>
                )}
        </DropdownMenu>
      </Dropdown>        
      {!avTicket ? (
                <div className="main">
                    <h3 className="stud" ><b>Todavía no hay ventas </b></h3>
                </div>)
            : (

                <div className="main">
                    <br></br>
                    <br></br>
                    <h2 className="stud" > Qtz.{avCash + avCard}</h2><h3 className="detailz">en {ticketNum} tickets</h3>
                    <h2>- -- -</h2>
                    <h3 className="study" ><b>Q.</b>{avTicket} / ticket</h3>
                   
                    <h4 className="pfff"><b>Tarjeta</b>{' '}<FontAwesomeIcon icon={faCreditCard}/> Q.{avCard}</h4>
                    <h4 className="pfff"><b>Efectivo</b>{' '}<FontAwesomeIcon icon={faMoneyBillWave}/>: Q.{avCash}</h4>
                    <br></br>
                    <Button theme="warning" href={redirectURL} onClick={closeSalesDay} ><FontAwesomeIcon icon={faEnvelope}/>{'  '}Enviar cierre de caja</Button>
                </div>)
            }
        </>
    )

}

export default Report;