import database from "./firebase";


const getAll = (table) => {
  const dbs = database.ref(table);
  return dbs;
};

const create = (data,table) => {
  const dbs = database.ref(table);
  return dbs.push(data);
};


const update = (key, data) => {
  const dbs = database.ref("/ventas-getfit");
  return dbs.child(key).update(data);
};

const inHouseTicket=(data)=>{
  const dbs = database.ref("/inhouse-getfit");
  return dbs.push(data);
}

const updateInventory = (key, data) => {
  const dbs = database.ref("/inhouse-getfit");
  return dbs.child(key).update(data);
};

const remove = (key) => {
  const db = database.ref("/inventario-getfit");
  return db.child(key).remove();
};

const removeSale = (key)=>{
  const db = database.ref("/ventas-getfit");
  return db.child(key).remove();
}
const removeAll = () => {
  const db = database.ref("/inventario-getfit");
  return db.remove();
};

export default {
  getAll,
  inHouseTicket,
  create,
  updateInventory,
  removeSale,
  update,
  remove,
  removeAll,
};
