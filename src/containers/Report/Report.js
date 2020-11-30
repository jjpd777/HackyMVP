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
import DBservice from '../../services/DBservice'

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
    const sectionDate = DBservice.getDateforSection();
    const [reportDate, setReportDate] = useState(sectionDate);
    const [totalNumTickets, setTotalNum]= useState(0);
    const [triggerReport, setTrigger] =useState(false)
    const [STORENAME,setSTORENAME] = useState(DBservice.getStoreName())



    // function getDateforSection() {
    //   const DMY = DBservice.newMHMY().split("&")[1];
    //   return DMY;

    // }
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
    },[salesItems, reportDate])

    useEffect(()=>closeSalesDay(),[triggerReport])

    function bubbleSort(arr){
        var len = arr.length;
        for (var i = len-1; i>=0; i--){
          for(var j = 1; j<=i; j++){
            if(arr[j-1].sold >arr[j].sold){
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
             }
          }
        }
        return arr;
     }
    
      const getSalesSummary = () => {
        if(!props.registerItems) return;

        let response= [];
        props.registerItems.map((item) => {
          if (item.quantityavailable > 0) {
            const itemSold = {
              id: item.productID,
              name: item.name,
              sold: item.quantityavailable
            }
            response.push(itemSold);
          }
        }
        )
        var sortedArray = bubbleSort(response);
        sortedArray = sortedArray.reverse();


        var totalSales = "%0A%0AHoy las ventas fueron las siguientes:%0A%0A" 
        sortedArray.map((item)=>{
          totalSales+= "*x"+ String(item.sold) + "* "+ item.name +"%0A"
        })
        const rsp = totalSales.split(' ').join("%20");
        return rsp;
      }

    const closeSalesDay = () => {

        if(!props.menuItems) return;
        var baseURL = "https://wa.me/50249503041?text=";
        const welcome = "Buenas de *"+ STORENAME+"*";
        const totalSales = "%0A%0AEl dia de hoy " + reportDate + " el *total de ventas fué: Qtz. " + String(avCash + avCard)+"* en *"+String(totalNumTickets)+"* tickets.";
        const ticketText = "%0A%0A*El ticket promedio* fué de: *Qtz. " + String(avTicket) + "*"
        const numCardText = "%0A%0A*Ventas en tarjeta: Qtz" + avCard + "*";
        const numCashText = "%0A%0A*Ventas en efectivo: Qtz" + avCash + "*";
        const resp = welcome + totalSales + ticketText + numCardText + numCashText;
        const response = resp.split(" ").join("%20");
        const inventorySummary = getSalesSummary();
        const send = baseURL + response + inventorySummary;
        setRedirect(send);
    }

    const ticketsReport = () => {
        var active = 0;
        var cancelled = 0;
        const today = reportDate;
        var salesToday = props.salesItems.filter((item)=> item.category ===today)
        salesToday.map((val) => val.valid ? active++ : cancelled++);
    }
    const getStats = () => {
        var salesTotal = 0;
        var cardTotal = 0;
        var cashTotal = 0;
        var tickets = 0;
        const today = reportDate;
        var salesToday = props.salesItems.filter((item)=> item.category ===today && item.valid)
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
        setTotalNum(salesToday.length);
        setAvCard(cardTotal);
        setAvCash(cashTotal);
        setAvTicket(result);
    }
    return (
        <>
       {/* <Dropdown className="date-container" open={dropDown} toggle={()=> setDropDown(!dropDown)} group>
        <Button className="date-button">{reportDate}</Button>
        <DropdownToggle split />
        <DropdownMenu>
            {getDatesforButton().map((date)=>
                <DropdownItem className="drop-item" onClick={()=>setReportDate(String(date))}>{date}</DropdownItem>
                )}
        </DropdownMenu>
      </Dropdown>         */}
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
                    {/* <Button theme="warning" href={triggerReport ? redirectURL : "" }onClick={setTrigger(!triggerReport)} ><FontAwesomeIcon icon={faEnvelope}/>{'  '}{redirectURL!==""? 'Enviar cierre de caja' : 'Generar cierre de caja'}</Button> */}
                { !triggerReport &&<Button className="date-button" onClick={()=>setTrigger(!triggerReport)}>Generar resumen</Button>}
                { triggerReport &&<Button className="date-button" href={redirectURL}>Enviar resumen</Button>}
                </div>)
            }
        </>
    )

}

export default Report;