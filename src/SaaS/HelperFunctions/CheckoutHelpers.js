export const TRANSACTION_SCHEMA = (props)=>{
    // name, products, total amount, timestamp, destinationAddress, whatsAppURL, additionalNotes
    const {employeeName, customerName, order, totalAmount, timestamp, destinationAddress, whatsAppURL, additionalNotes}=props;
    const schema = {
        employeeName: employeeName,
        customerName: customerName,
        order: order,
        totalAmount: totalAmount,
        timestamp: timestamp,
        destinationAddress: destinationAddress,
        whatsAppURL: whatsAppURL, 
        additionalNotes: additionalNotes,
    };
    return schema;
};

const craftString = (message) => {
    var hashtag = /#/gi;
    message = message.replace(hashtag, "%23");
    message = message.replace(":", "%3A");
    message = message.split(" ").join("%20");
    return message;
  }

export const generateWhatsAppURL = (destinationPhone, orderInformtion) => {
    const [cart, menuItems, additionalNotes, name, address] = orderInformtion;
    let baseURL = "https://wa.me/502"+ destinationPhone +"?text=";
    const  orderDetail = craftString("Por este medio le envío%20un comprobante de su pedido el día de hoy.%0A%0A*Por favor confirmar que la información sea la correcta.*%0A%0A")
    let textBody = craftString("Buenos días le escribe *Ever* de%20de%20parte%20de%20*SOLAGRO*%0A%0A") + orderDetail;
    const customerPreface = "%0A*-- INFORMACIÓN DEL CLIENTE --*"
    const customerSummary = customerPreface+ "%0A*Nombre de cliente*:%0A"+ name +"%0A*Nombre de la finca*:%0A" + address
    var totalPurchase = 0;
    cart.map((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          totalPurchase+= (cartItem.quantity * menuItem.price);
          const tmp = "%20( *x%20" + String(cartItem.quantity) + "* ) %20" + menuItem.name + "%20*Qtz.* "+ menuItem.price + "%0A"
          textBody += tmp
        }
      });
    });
    textBody += "*-----------*%0ATOTAL *Qtz.* "+totalPurchase+"%0A";
    textBody = textBody + customerSummary + "%0A*Notas%20adicionales:*%0A " + craftString(additionalNotes);
    textBody = craftString(textBody);
    var purchase = baseURL + textBody + "%0A%0A- - - -%0A*SOLAGRO*%20expertos%20en%20aguacate.%0Ahttps://solagroguate.com/";

    return purchase;
  };

  export const simplifyCart = (cart, menuItems) => {
    let cartItems=[];
    cart.forEach((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          cartItems.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: cartItem.quantity,
          });
        }
      });
    });
    return cartItems;
  };