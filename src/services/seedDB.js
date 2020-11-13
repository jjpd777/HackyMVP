import { menuItemsMock } from '../cp-menut';
import DBservice from "./DBservice";

const table2write = "/inventario-borgona"
const transcribe = () => {
    var ptr = 0;
    menuItemsMock.map((item) => {
      var data = {
        id: ptr++,
        category: item.category,
        name: item.name,
        brief: item.brief,
        quantityavailable: 757,
        price: item.price,
        image: "",
      };
      DBservice.create(data,table2write)
        .then(() => {
          console.log(data)
        })
        .catch(e => {
          console.log(e);
        });
    })
  };


export default {transcribe};