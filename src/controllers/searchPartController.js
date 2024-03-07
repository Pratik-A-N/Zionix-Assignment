import getMouserPartPrice from '../apis/mouserApi.js';
import getRutronikPartPrice from '../apis/rutronikApi.js';

class SearchPartController{
    static async getPartNumberPrice(req,res) {
        try {
            const body = req.body;
            const part_number = body.part_number;
            const quantity = body.quantity;
            const mouserPrice = await getMouserPartPrice(part_number, quantity);
            const rutronikPrice = await getRutronikPartPrice(part_number,quantity);
            return res.status(200).json({
                "Mouser Price" : mouserPrice,
                "Rutronic Price" : rutronikPrice
            })
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({"error": error})
        }
    }
}

export default SearchPartController;