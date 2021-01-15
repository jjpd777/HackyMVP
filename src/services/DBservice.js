import database from "./firebase";
// const ROOT = "BORGONA";
// const STORE_LIST = ["GERONA", "AUTOPAN", "NOVITA", "PLAZOLETA", "FRAIJANES","COMERCIA"];
const ROOT = "INDUSTRIAS-MONTUFAR";
const STORE_LIST = ["CAFE-PARÍS"]
const STORENAME = STORE_LIST[0];
const SHOP_URL = ROOT + "/" + STORENAME;
const INVENTORY_URL = ROOT + "/inventory";
const SALES_URL = SHOP_URL + "/sales/";
const REGISTER = SHOP_URL + "/daily-transactions/";
const MOVEMENT_URL = ROOT + "/movements/";
const LEDGER_URL = ROOT + '/ledger/';
const OPEN_CLOSE_CASH = SHOP_URL + '/open-close/';

// ====>>>> <<<<=====

const getFitFlag = () => true;
const getStoreName = () => STORENAME;


export const StoreDetailUtil = ()=>{
  const GET_STORE_NAME = ()=> STORENAME;
  const GET_LIST_STORES = () =>STORE_LIST;
  return { GET_STORE_NAME, GET_LIST_STORES};
};

export const DateUtil = () => {
  const unixTime = ()=>{
    return Math.round((new Date()).getTime() / 1000);
  };
  const newMHDMY = () => {
    var today = new Date();
    var min = String(today.getMinutes()).padStart(2, '0');
    var hr = String(today.getHours()).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return hr + ":" + min + "&" + dd + '-' + mm + '-' + yyyy;
  };
  const getStandardDate = () => {
    const DMY = newMHDMY().split("&")[1];
    return DMY;
  }
  return { newMHDMY, getStandardDate, unixTime }
}

export const AdminReportsDB = () => {
  const root4shops = () => {
    const ref = database.ref(ROOT + '/');
    return ref;
  };
  return { root4shops }
}

export const MovementsDB = () => {
  const { getStandardDate } = DateUtil();
  const timestamp = getStandardDate();
  const DESTINATION = MOVEMENT_URL + timestamp;;

  const getAllMovements = () => {
    const db = database.ref(DESTINATION);
    return db;
  };

  const createMovement = (data) => {
    const MOV_DST = LEDGER_URL+ timestamp;
    const ref = database.ref(MOV_DST).push();
    var insertionData = data;
    insertionData.movementID = ref.key;
    ref.set(insertionData);
    return ref.key;
  };

  

  return { getAllMovements, createMovement }
};

export const DailyTransactionsDB = () => {
  const getRegisterAddress = () => {
    const { getStandardDate } = DateUtil();
    const timestamp = getStandardDate();
    const testAddress = REGISTER + timestamp;
    return testAddress
  }
  const getDailyTransactions = () => {
    const testAddress = getRegisterAddress();
    // const DESTINATION = REGISTER + "19-12-2020"
    const db = database.ref(testAddress);
    return db;
  };
  const getTransactions4Date = (date) => {
    const db = database.ref(REGISTER + date);
    return db;
  };
  return { getDailyTransactions, getTransactions4Date }

};

export const SalesDB = () => {
  const { getStandardDate } = DateUtil();
  const timestamp = getStandardDate();
  const getAllSales = () => {
    const db = database.ref(SALES_URL);
    return db;
  };
  const getDaySales = (date) => {
    const db = database.ref(SALES_URL + date);
    return db;
  }; 
  
  const getDaySalesDynamically = (date, shop) => {
    console.log(ROOT+"/"+shop + "/"+ date, "SADFSD")
    const db = database.ref(ROOT+"/"+shop + "/sales/"+ date);
    return db;
  };
  const updateSale = (key, data) => {
    const db = database.ref(SALES_URL + timestamp);
    return db.child(key).update(data);
  };

  const updateSaleDynamically = (shop, key, data) => {
    const db = database.ref(ROOT+"/"+shop + "/sales/"+ timestamp);
    return db.child(key).update(data);
  };

  return { getAllSales, getDaySales, 
          updateSale, getDaySalesDynamically, updateSaleDynamically }
};

export const InventoryDB = () => {

  const getAllInventory = () => {
    const db = database.ref(INVENTORY_URL);
    return db;
  };
  const createInventory = (data) => {
    var ref = database.ref(INVENTORY_URL).push();
    var insertionData = data;
    insertionData.id = ref.key;
    ref.set(insertionData);
    return ref.key;
  };
  const updateInventory = (key, data) => {
    const db = database.ref(INVENTORY_URL);
    return db.child(key).update(data);
  };
  const removeInventory = (key) => {
    const db = database.ref(INVENTORY_URL);
    return db.child(key).remove();
  };

  return { getAllInventory, createInventory, updateInventory, removeInventory }

};

export const LedgerDB = ()=>{
  const {newMHDMY} = DateUtil();
  const READABLE_TIMESTAMP = newMHDMY().split('&')[1];
  const DESTINATION = LEDGER_URL + READABLE_TIMESTAMP;
  const fetchNewsfeed = ()=>{
      const reference = database.ref(DESTINATION);
      return reference;
  }
  const insertLedgerEntry = (data)=>{
      const reference = database.ref(DESTINATION).push(data);
      return reference;
  };
  const updateLedger= (key, data)=>{
    const db = database.ref(DESTINATION);
    return db.child(key).update(data);
  }

  return {insertLedgerEntry, fetchNewsfeed, updateLedger};
};

export const StartCloseDB = ()=>{
  const { getStandardDate } = DateUtil();
  const READABLE_TIMESTAMP = getStandardDate();

  const isCashRegisterOpen = (shop)=>{
    const DSST= ROOT+'/'+shop+'/open-close/'+READABLE_TIMESTAMP + '/caja/open';
        const reference = database.ref(DSST);
      return reference;
  };

  const isCashRegisterClosed = (shop)=>{
    const DSST =  ROOT+'/'+shop+'/open-close/'+READABLE_TIMESTAMP + '/caja/close'
      const reference = database.ref(DSST);
    return reference;
};

  return {isCashRegisterOpen, isCashRegisterClosed};
};












const updateSoldUnits = (key, data) => {
  const { getStandardDate } = DateUtil();
  const timestamp = getStandardDate();
  const start = REGISTER + timestamp;
  const db = database.ref(start);
  return db.child(key).update(data);
};

// ====>>>> <<<<=====


// ====>>>> <<<<=====



const updateStock = (key, data) => {
  const db = database.ref(SALES_URL);
  return db.child(key).update(data);

}


const changesLog = (data) => {
  const db = database.ref(ROOT + "/changes-log");
  db.push(data);
}
export default {
  updateSoldUnits,
  getStoreName,

  //////
  updateStock,
  getFitFlag,
  changesLog,
};

// const update2daily= (key, data) => {
//   const start = REGISTER+getDateforSection();
//   const db = database.ref(start);
//   return db.child(key).update(data);
// };

// const getDailyTransactions = () =>{
//   // const testAddress = getRegisterAddress();
//   const DESTINATION = REGISTER+"19-12-2020"
//   const db = database.ref(DESTINATION);
//   return db;
// }

// const seedSales = (inventory) => {
//   const DESTINATION = getRegisterAddress() + '/';
//     // if(database().ref(DESTINATION)) return;

//     const stockInfo = {
//         inStock: 0,
//         sold: 0,
//     };
//     inventory.map((item) => {
//         const db = database.ref(DESTINATION).push();

//         var data = {
//             productID: item.id,
//             category: item.category,
//             name: item.name,
//             price: item.price,
//             image: item.image,
//             stock: stockInfo,
//             insertionID: db.key,
//         };
//         db.set(data);
//     });
// };
// const createSale = (data) => {
//   const db = database.ref(SALES_URL).push();
//   return db.set(data);
// };
// const insert2daily = (data) => {
//   const todaysTable = getRegisterAddress();
//   var ref = database.ref(todaysTable).push();
//   var insertionData = data;
//   insertionData.insertionID = ref.key;
//   ref.set(insertionData);
// };


