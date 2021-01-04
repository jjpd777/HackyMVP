import React, { useEffect, useState } from 'react';
import {sumShopSales, bubbleSort} from '../../utils/Utils';
import ReportCard from './ReportCard'
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
import DBservice , {DateUtil, AdminReportsDB, StartCloseDB}from '../../services/DBservice'


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    FormInput,
    DropdownItem
  } from "shards-react";


function Report() {
  const {getStandardDate} = DateUtil();
    const { isCashRegisterOpen,isCashRegisterClosed } = StartCloseDB();
    const {root4shops} = AdminReportsDB();

    const TODAY = getStandardDate();
    // const salesItems=[];
    const [loadingReport, setLoading] = useState(true);
    const [shopKeys, setShopKeys] = useState([]);
    const [individualShops, setIndividualShops] =useState([]);
    const [openedDay, setOpenedDay]=useState("Aún no han abierto.");
    const [closeSalesDay, setClosedDay]=useState("Aún no han cerrado.");
    const [dateHandler, setDateHandler] = useState(TODAY);
    const [listOfDates, setListOfDates]  = useState([]);
    const [openDD, setDD] = useState(false);
    const [listOpenClose, setListOC] = useState([]);
    const [lockKeyPad, setLockKey] = useState("");
    const [BOOL_MOFO, SET_BOOL] = useState(false);



   
    
    useEffect(() => {
    const ref = root4shops();
    const refVal = ref.on('value', function (snapshot) {
      const DATE2FETCH = dateHandler;
      var individualS=[]; var dailyStoreRecord = [];
      var keyVal = []; var tmp_longest = [];

      const snap = snapshot.val();
      if(!snap) return;
      const respKeys = Object.keys(snap);
      const xx = respKeys.filter((x)=> x !== "inventory"); const yy =  xx.filter((x)=> x !== "ledger");
      const keys = yy.filter((x)=> x !=="orders-factory")

      keys.map((key) => {
        const shop = snap[key];
        var storeItems= []; var openCloseRecord = [];
        const SALES_TABLE = shop['sales'];
        const OPEN_CLOSE_TABLE = shop['open-close'];
        keyVal.push(key);

        if (!!SALES_TABLE && SALES_TABLE[DATE2FETCH]) {
          const datesExamined = Object.keys(SALES_TABLE);
          tmp_longest = datesExamined.length>tmp_longest.length ? datesExamined :tmp_longest;

          const dailytransactions = SALES_TABLE[DATE2FETCH];
          const dailyOpenClose = OPEN_CLOSE_TABLE[DATE2FETCH];

          const nKeys = Object.keys(dailytransactions);
          const nnKeys = Object.keys(dailyOpenClose);

          nKeys.map((k) => storeItems.push(dailytransactions[k]));
          nnKeys.map((k)=> openCloseRecord.push(dailyOpenClose[k]))
        };
        individualS.push(storeItems); 
        dailyStoreRecord.push(openCloseRecord);
      })

      var array2sort=[];
      individualS.map((shop,ix)=> {
        const sum = sumShopSales(shop);
        array2sort.push([shop,sum, keyVal[ix], dailyStoreRecord[ix]]);
      });
      const sortedArray = bubbleSort(array2sort).reverse();

      setIndividualShops(sortedArray.map((item)=> item[0]));
      setShopKeys( sortedArray.map((item)=> item[2]));
      setListOC(sortedArray.map((x)=> x[3]))
      setLoading(!loadingReport);
      setListOfDates(tmp_longest);
    });
    return () => ref.off('value', refVal)
  }, [dateHandler])

    const assembleForGlobalReport = ()=>{
        var largeShop =[];
        individualShops.map((x)=> largeShop.push(...x))
        return largeShop;
    }
    const UNLOCK_BOOLEAN =  lockKeyPad === "1234";
    const FULL_STORE = assembleForGlobalReport();


    return (
      <>
      <br></br>
      <br></br>
      <br></br>
      
      {/* {!!individualShops.length && <h3>Últimas 3 son visibles y cancelables</h3>} */}
      <div className="sales-list-new">
      {!individualShops.length && <Button className="not-yet-rep">Cargando...</Button>}
      <br></br>
      {!UNLOCK_BOOLEAN && <> 
      <h3 className="keyEntry">Clave para entrar: </h3>
      <FormInput
            className="admin-rep-access"
            value={lockKeyPad}
            onChange={(e) => {
              setLockKey(e.target.value);
            }}
          />
      </>}
      <br></br>
   { UNLOCK_BOOLEAN &&  <Dropdown  open={openDD} toggle={()=>{setDD(!openDD)}}>
        <DropdownToggle className="drop-rep-dates" theme="success">{dateHandler}</DropdownToggle>
        <DropdownMenu>
          {listOfDates.map((x)=>
              <>
                <DropdownItem onClick={()=>setDateHandler(x)}>{x}</DropdownItem>
              </>
          )}
        </DropdownMenu>
      </Dropdown>}
     { UNLOCK_BOOLEAN && <ReportCard reportItem={FULL_STORE} storeKey={"GLOBAL"} openCloseProp={[]} />}

      {individualShops.map((item, ix) =>
        <>
        {UNLOCK_BOOLEAN && <ReportCard reportItem={item} storeKey={String(shopKeys[ix])} openCloseProp={listOpenClose[ix]}/>}              
        </>
      )}
      </div>

  </>
    )

}

export default Report;