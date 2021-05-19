import React, { useEffect, useState } from 'react';
import { Button, FormInput, Card, CardBody } from 'shards-react';
import {PoS_DB} from '../../Database/DatabaseFunctions';
import SalesCard from './SalesCard';
import './SalesReport.scss'


const keyMaper = (x)=>{
    const k = Object.keys(x);
    return k.map((t)=> x[t]);
};

const STORES = ["GERONA","COMERCIA" ,"NOVITA", "PLAZOLETA",
"FRAIJANES","AUTOPAN"];
// const STORES = ["AUTOPAN"]
const MONTH = [["01","Enero"],["02", "Febrero"],["03", "Marzo"], 
        ["04", "Abril"],["05", "Mayo"], ["06","Junio"]];


function SalesReport (){
    const [sale, Sales ] = useState("");
    const [globalSales, setGlobalSales] = useState(0);
    const [i, setI] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(MONTH[i])

    const nextMonth = ()=>{
        const t = (i+1)% MONTH.length;
        setI(t); setCurrentMonth(MONTH[t]);
    }

    return(
    <div>
        <Button className="month-looper" onClick={nextMonth}> {currentMonth[1]}  </Button>
        <div>
      {STORES.map((x, ix)=>  <SalesCard name ={x} month={currentMonth[0]} />)}
        </div>
    </div>)

}

export default SalesReport;