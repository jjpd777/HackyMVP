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
    const monthsKeyPair = {
        "01" : "enero",
        "02" : "febrero",
        "03" : "marzo",
        "04" : "abril",
        "05" : "mayo", 
        "06" : "junio",
        "07" : "julio",
        "08" : "agosto"
    };

    const currentDayParser = (x)=>{
        const ix = x.split('-');
        return ix[0] + " "+ monthsKeyPair[ix[1]]+ " " + ix[2]
    }
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
    const march = () => {
        var march = [];
        for (var i = 1; i < 32; i++) {
            const ix = (i < 10 ? "0"  : "") + String(i);
            march.push(String(ix) + "-03-2021");
        }
        return march;
    };
    const april = ()=>{
        var april = [];
        for (var i = 1; i < 31; i++) {
            const ix = (i < 10 ? "0"  : "") + String(i);
            april.push(String(ix) + "-04-2021");
        }
        return april;
    }
    const may = ()=>{
        var m = [];
        for (var i = 1; i < 32; i++) {
            const ix = (i < 10 ? "0"  : "") + String(i);
            m.push(String(ix) + "-05-2021");
        }
        return m;
    }

    const june = ()=>{
        var m = [];
        for (var i = 1; i < 31; i++) {
            const ix = (i < 10 ? "0"  : "") + String(i);
            m.push(String(ix) + "-06-2021");
        }
        return m;
    }
    const july = ()=>{
        var m = [];
        for (var i = 1; i < 32; i++) {
            const ix = (i < 10 ? "0"  : "") + String(i);
            m.push(String(ix) + "-07-2021");
        }
        return m;
    }
    const august = ()=>{
        var m = [];
        for (var i = 1; i < 31; i++) {
            const ix = (i < 10 ? "0"  : "") + String(i);
            m.push(String(ix) + "-08-2021");
        }
        return m;
    }
   
    // const [feb, setFeb] = useState([]);
    const MONTH_ARRAY = [["Enero", jan()], ["Febrero", feb()],["Marzo",march()], ["Abril", april()],
                        ["Mayo", may()], ["Junio", june()],["Julio",july()],["Agosto", august()]]
    const [pointer, setPointer] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(MONTH_ARRAY[pointer]);

    const chooseMonth = (x)=>{
        console.log(currentMonth)
        setCurrentMonth(x);
        setCurrentDay(x[1][14]);
    }

    return (
        <div>
            {MONTH_ARRAY.map(x=><Button className="months" onClick={()=>chooseMonth(x)}>{x[0]}</Button>)}
            <div className="drop-down">
            <Dropdown className="drop-main" open={openDropdown} toggle={()=>setOpenDropdown(!openDropdown)}>
                <DropdownToggle className="current-day">{currentDayParser(currentDay)}</DropdownToggle>
                <DropdownMenu className="menu" right>
                    {currentMonth[1].map(x=><DropdownItem 
                    onClick={()=>setCurrentDay(x)}
                     className="monthsy"><h2>{currentDayParser(x)}</h2></DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
            </div>
          
            {STORES.map(x => <DailyCard name={x} dayMonth={currentMonth[1]}
                presentDay={currentDay} setDay={setCurrentDay} />)}
        </div>
    )
}

export default DailySummary;