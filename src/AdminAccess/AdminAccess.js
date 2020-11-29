import React, { useEffect, useState } from 'react';
import DBservice from '../services/DBservice'
import { Button } from 'shards-react';
import { useList } from "react-firebase-hooks/database";

// ====>>>> <<<<=====
// ====>>>> <<<<=====

const DESTINATION = "/admin-db";
const SALES = DESTINATION + "/sales/"

// ====>>>> <<<<=====
// ====>>>> <<<<=====


function AdminAccess(props){
    const start = SALES+DBservice.newDate()
    const [dbRegisterSales, loading, error] = useList(DBservice.getAllTest(start));

    useEffect(()=> check())
    const newDate = ()=>{
        var today = new Date();
        var min = String(today.getMinutes()).padStart(2, '0');
        var hr = String(today.getHours()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        return min+ ":"+hr+ "&"+mm + '%' + dd + '%' + yyyy;
    }

    const startSalesDay = ()=>{
        if(props.loading || !props.menuItems.length) return;
        DBservice.seedSales(props.menuItems, start);
        console.log("success");
    }
    const recreateDatabase = ()=>{
        if(props.loading || !props.menuItems.length) return;
        DBservice.transcribe(props.menuItems, start);
    }

    const check = ()=>{ 
        if(dbRegisterSales.length) return;
        startSalesDay();
    };
    const insertTest = ()=>DBservice.createTest("TEST",start)

    return(
        <>
        <Button onClick={()=> recreateDatabase()}> RECREAR BASE DE DATOS</Button>
        <Button onClick={()=> check()} > Check Existence</Button>
        <Button onClick={()=> insertTest()}> INSERT</Button>
        <Button onClick={()=> console.log(dbRegisterSales.length)}>LENGTH</Button>


        </>
    )
}

export default AdminAccess;