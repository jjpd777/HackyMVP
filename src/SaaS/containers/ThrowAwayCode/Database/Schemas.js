



export const Schemas = ()=>{
    const ReceiptFormat = (props)=>{
        const [timestamp, whatsAppURL, purchaseSummary, infoCall2SAT, issuedInEmergency] = props;
        return {
            id : "",
            timestamp:timestamp,
            issuedInEmergency: issuedInEmergency,
            tributaryStatus : true,
            purchaseSummary: purchaseSummary,
            infoCall2SAT: infoCall2SAT,
            whatsAppURL: whatsAppURL
        }
    
    }
    return {ReceiptFormat}

}

