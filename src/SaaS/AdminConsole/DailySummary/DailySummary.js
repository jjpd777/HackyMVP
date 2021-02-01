import React, { useEffect, useState } from 'react';
import { Button, FormInput, Card, CardBody } from 'shards-react';
import { PoS_DB, newMHDMY } from '../../Database/DatabaseFunctions';
import DailyCard from './DailyCard';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import './DailySummary.scss'


function DailySummary() {
    const [currentDay, setCurrentDay] = useState(newMHDMY().split('&')[1]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const STORES = ["GERONA","COMERCIA" ,"NOVITA", "PLAZOLETA",
         "FRAIJANES","AUTOPAN"];

    const jan = () => {
        var january = [];
        for (var i = 1; i < 32; i++) {
            const ix = i < 10 ? "0" + String(i) : String(i);
            january.push(ix + "-01-2021");
        }
        return january;
    };
    const feb = () => {
        var february = [];
        for (var i = 1; i < 29; i++) {
            const ix = i < 10 ? "0" + String(i) : String(i);
            february.push(String(ix) + "-02-2021");
        }
        return february;
    };
    // const [feb, setFeb] = useState([]);
    const MONTH_ARRAY = [["Enero", jan()], ["Febrero", feb()]]
    const [pointer, setPointer] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(MONTH_ARRAY[pointer]);

    const chooseMonth = (x)=>{
        console.log(currentMonth)
        setCurrentMonth(x);
        setCurrentDay(x[1][15]);
    }

    return (
        <div>
            {MONTH_ARRAY.map(x=><Button className="months" onClick={()=>chooseMonth(x)}>{x[0]}</Button>)}
            <div className="drop-down">
            <Dropdown className="drop-main" open={openDropdown} toggle={()=>setOpenDropdown(!openDropdown)}>
                <DropdownToggle className="current-day">{currentDay}</DropdownToggle>
                <DropdownMenu className="menu" right>
                    {currentMonth[1].map(x=><DropdownItem 
                    onClick={()=>setCurrentDay(x)}
                     className="months"><h2>{x}</h2></DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
            </div>
          
            {STORES.map(x => <DailyCard name={x} dayMonth={currentMonth[1]}
                presentDay={currentDay} setDay={setCurrentDay} />)}
        </div>
    )
}

export default DailySummary;