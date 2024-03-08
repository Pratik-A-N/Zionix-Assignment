import getMouserPartPrice from '../apis/mouserApi.js';
import getRutronikPartPrice from '../apis/rutronikApi.js';


class SearchPartController{
    static async getPartNumberPrice(req,res) {
        try {
            const body = req.body;
            const part_number = body.part_number;
            const quantity = body.quantity;
            let mouserPrice = await getMouserPartPrice(part_number, quantity);
            let rutronikPrice = await getRutronikPartPrice(part_number,quantity);
            if(mouserPrice == 500){
                mouserPrice = "NA"
            }
            if(rutronikPrice == 500){
                rutronikPrice = "NA"
            }
            return res.status(200).json({
                "Mouser_Price" : mouserPrice,
                "Rutronic_Price" : rutronikPrice
            })
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({"error": error})
        }
    }
}

export default SearchPartController;