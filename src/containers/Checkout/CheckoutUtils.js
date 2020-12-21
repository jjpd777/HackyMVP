

  const craftString = (message) => {
    var hashtag = /#/gi;
    message = message.replace(hashtag, "%23")
    message = message.replace(":", "%3A")
    message = message.replace(hashtag, "%20")
    return message;
  }

export const generateWhatsAppURL = (cart, menuItems, additionalNotes, location) => {
    let baseURL = "https://wa.me/50251740464?text=";
    let textBody = "Buenas%20noches%20de%20parte%20de%20*" + String(location) + "*. La%20lista%20de%20hoy%20es%20la%20siguiente:%0A%0A";

    cart.map((cartItem) => {
      menuItems.map((menuItem) => {
        console.log(menuItem, cartItem)
        if (cartItem.id === menuItem.id) {
          const tmp = "-%20*x*%20" + String(cartItem.quantity) + " %20" + menuItem.name + "%0A"
          textBody += tmp
        }
      });
    });
    textBody = textBody + "%0A%0A*NOTAS%20ADICIONALES* " + additionalNotes;
    textBody = craftString(textBody);
    var purchase = baseURL + textBody + "%0A%0A*BENDICIONES%20PARA%20TODOS*";

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