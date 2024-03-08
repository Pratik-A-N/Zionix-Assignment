import axios from "axios"
import "dotenv/config"

const getRutronikPartPrice = async (partNumber, quantity) => {
    try {
        const rutronikApiKey = process.env.RUTRONIC_API_KEY;
        const rutronikApiUrl = process.env.RUTRONIC_API_URL;
        const queryParams = {
            apikey: rutronikApiKey,
            mpn: partNumber
        };
        const response = await axios.get(rutronikApiUrl, {params: queryParams});
        if(response.data == '') return 500;
        const currency = response.data.currency;
        const prices = response.data.pricebreaks;
        const packed_unit = response.data.pu
        if(quantity%packed_unit != 0){
            return {
                "Message": `Enter Quantity accroding to the Price Breaks and in multiple of ${packed_unit}`,
                "Price_Breaks" : prices
            }
        }
        let final_price = -1;
        prices.forEach(price => {
            let current_quantity = parseInt(price.quantity);
            if(current_quantity != 0 && current_quantity <= quantity){
                final_price = parseFloat(price.price.replace(/[^\d.]/g, ''));
            }
        });
        
        const total_sum = final_price*quantity;
        
        return currency + " " + total_sum.toString();
    } catch (error) {
        console.error("Error: ", error);
        return 500
    }
}

export default getRutronikPartPrice;
