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
  const dbs = database.ref("/ventas-borgona");
  return dbs.child(key).update(data);
};

const remove = (key) => {
  const db = database.ref("/inventario-borgona");
  return db.child(key).remove();
};

const removeAll = () => {
  const db = database.ref("/inventario-borgona");
  return db.remove();
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
};
