import axios from "axios"
import "dotenv/config"

const getMouserPartPrice = async (partNumber, quantity) => {
    try {
        const mouserApiKey = process.env.MOUSER_API_KEY;
        const mouserApiUrl = process.env.MOUSER_API_URL;
        const postData = {
            SearchByPartRequest: {
                mouserPartNumber: partNumber,
            }
        }
        const queryParams = {
            apiKey: mouserApiKey
        };
        const response = await axios.post(mouserApiUrl, postData, {params: queryParams});
        
        
        let prices = [];
        response.data.SearchResults.Parts.forEach((ele)=>{
            
            if(ele.ManufacturerPartNumber == partNumber){
                // console.log(ele.ManufacturerPartNumber);
                prices.push(ele)
            }
        })
        // console.log(prices);
        const currency = prices[0].PriceBreaks[0].Currency;
        
        let final_price = 0;
        prices[0].PriceBreaks.forEach(price => {
            if(price.Quantity <= quantity){
                final_price = parseFloat(price.Price.replace(/[^\d.]/g, ''));
            }
        });
        
        const total_sum = final_price*quantity;
        
        return currency + " " + total_sum.toString();
    } catch (error) {
        console.error("Error: ", error);
        return 500;
    }
}

export default getMouserPartPrice;
