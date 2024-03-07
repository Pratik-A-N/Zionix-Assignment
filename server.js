import express from "express";
import "dotenv/config"
// import routes
import searchPartRouter from './src/routes/searchPartRouter.js'

const PORT = process.env.PORT;

const app = express();
app.use(express.json())

app.use('/searchPart', searchPartRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running ... ${PORT}`);
})