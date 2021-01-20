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
    const [cart, menuItems, additionalNotes, location] = orderInformtion;
    let baseURL = "https://wa.me/502"+ destinationPhone +"?text=";
    const  orderDetail = "*. La%20lista%20de%20hoy%20es%20la%20siguiente:%0A%0A"
    let textBody = "Buenas%20de%20parte%20de%20*SOLAGRO*%0A%0A" + orderDetail;

    cart.map((cartItem) => {
      menuItems.map((menuItem) => {
        if (cartItem.itemId === menuItem.id) {
          const tmp = "%20*x%20" + String(cartItem.quantity) + "* %20" + menuItem.name + "%0A"
          textBody += tmp
        }
      });
    });
    textBody = textBody + "%0A%0A*NOTAS%20ADICIONALES* " + craftString(additionalNotes);
    textBody = craftString(textBody);
    var purchase = baseURL + textBody + "%0A%0A*SOLAGRO*%20expertos%20en%20aguacate.";

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