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
        const datesExamined = Object.keys(SALES_TABLE);

        tmp_longest = datesExamined.length>tmp_longest.length ? datesExamined :tmp_longest;

        if (!!SALES_TABLE && SALES_TABLE[DATE2FETCH]) {
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

    // const sectionDate = getStandardDate();
    // const [reportDate, setReportDate] = useState(sectionDate);
    // const [totalNumTickets, setTotalNum]= useState(0);
    // const [triggerReport, setTrigger] =useState(false)
    // const [STORENAME,setSTORENAME] = useState(DBservice.getStoreName())

    // useEffect(() => {
    //     // getStats();
    //     // ticketsReport();
    // },[salesItems, reportDate])

    // useEffect(()=>closeSalesDay(),[triggerReport])

    // function bubbleSort(arr){
    //     var len = arr.length;
    //     for (var i = len-1; i>=0; i--){
    //       for(var j = 1; j<=i; j++){
    //         if(arr[j-1].sold >arr[j].sold){
    //             var temp = arr[j-1];
    //             arr[j-1] = arr[j];
    //             arr[j] = temp;
    //          }
    //       }
    //     }
    //     return arr;
    //  }
    
      // const getSalesSummary = () => {
      //   if(!props.registerItems) return;

      //   let response= [];
      //   props.registerItems.map((item) => {
      //     if (item.quantityavailable > 0) {
      //       const itemSold = {
      //         id: item.productID,
      //         name: item.name,
      //         sold: item.quantityavailable
      //       }
      //       response.push(itemSold);
      //     }
      //   }
      //   )
      //   var sortedArray = bubbleSort(response);
      //   sortedArray = sortedArray.reverse();


      //   var totalSales = "%0A%0AHoy las ventas fueron las siguientes:%0A%0A" 
      //   sortedArray.map((item)=>{
      //     totalSales+= "*x"+ String(item.sold) + "* "+ item.name +"%0A"
      //   })
      //   const rsp = totalSales.split(' ').join("%20");
      //   return rsp;
      // }
    const assembleForGlobalReport = ()=>{
        var largeShop =[];
        individualShops.map((x)=> largeShop.push(...x))
        return largeShop;
    }

    return (
      <>
      <br></br>
      <br></br>
      <br></br>
      
      {/* {!!individualShops.length && <h3>Últimas 3 son visibles y cancelables</h3>} */}
      <div className="sales-list-new">
      {!individualShops.length && <Button className="not-yet-rep">Cargando...</Button>}
      <br></br>
      {lockKeyPad !== "1234" && <> 
      <h3 className="keyEntry">Clave para entrar: </h3>
      <FormInput
            className="admin-rep-access"
            value={lockKeyPad}
            onChange={(e) => {
              setLockKey(e.target.value);
            }}
          />
      </>}
   { lockKeyPad === "1234" &&  <Dropdown  open={openDD} toggle={()=>{setDD(!openDD)}}>
        <DropdownToggle className="drop-rep-dates" theme="success">{dateHandler}</DropdownToggle>
        <DropdownMenu>
          {listOfDates.map((x)=>
              <>
                <DropdownItem onClick={()=>setDateHandler(x)}>{x}</DropdownItem>
              </>
          )}
        </DropdownMenu>
      </Dropdown>}
     { lockKeyPad=== "1234" && <ReportCard reportItem={assembleForGlobalReport()} storeKey={"GLOBAL"} openCloseProp={[]} />}

      {lockKeyPad === "1234" && individualShops.map((item, ix) =>
              <>
               <ReportCard reportItem={item} storeKey={String(shopKeys[ix])} openCloseProp={listOpenClose[ix]}/>
              </>
      )}
      </div>
  </>
    )

}

export default Report;