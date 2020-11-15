import DBservice from "./DBservice";
import React, { useEffect, useState } from 'react';
import Menu, { MenuItem } from '../containers/Menu/Menu';

import { useList } from "react-firebase-hooks/database";


function FetchData () {
    const [dbElements, loading, error] = useList(DBservice.getAll("/inventario-borgona"));
    const [dbSales, salesLoading, salesError] = useList(DBservice.getAll("/ventas-borgona"));
    const [loaded, setLoaded] = useState(false)
    const [menuItems, setMenuItems] = useState([]);
    const [salesItems, setSalesItems] = useState([]);

    useEffect(() => {
        placeItems(dbElements);
        placeSales(dbSales);
        setLoaded(true);
    }, [dbElements, dbSales]);


    const placeSales = (dboject) => {
        const obj = dboject.map((tutorial) => tutorial.val());
        const uniqd = dboject.map((tutorial) => tutorial.key);
        obj.map((item, ix) => item.id = uniqd[ix]);
        const sales = obj.reverse();
        setSalesItems(sales);
    }
    const placeItems = (dboject) => {
        // THIS IS SO HACKY LOOOOOOL BY FAR THE MOST VULNERABLE PART OF THE APPLICATION
        const obj = dboject.map((tutorial) => tutorial.val());
        const uniqd = dboject.map((tutorial) => tutorial.key);
        obj.map((item, ix) => item.id = uniqd[ix]);
        setMenuItems(obj);
    }
    const returnVal = ()=>salesItems;
}


export default FetchData;