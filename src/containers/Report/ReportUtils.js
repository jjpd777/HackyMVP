const craftString = (message) => {
    var hashtag = /#/gi;
    message = message.replace(hashtag, "%23")
    message = message.replace(":", "%3A")
    message = message.replace(hashtag, "%20")
    return message;
  }

export const generateWhatsAppURL = (storeName, sales, balances) => {
    let baseURL = "https://wa.me/50249503041?text=";
    let textBody = "Report%20de%20p%20de%20*" + String(storeName) + "*. La%20lista%20de%20hoy%20es%20la%20siguiente:%0A%0A";

    textBody = textBody + "%0A%0A*NOTAS%20ADICIONALES* " + sales;
    textBody = craftString(textBody);
    var purchase = baseURL + textBody + "%0A%0A*BENDICIONES%20PARA%20TODOS*";

    return purchase;
  };