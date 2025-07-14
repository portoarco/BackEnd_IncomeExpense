import express, { Application,Request,Response } from "express";
import dataRouter from "./src/routers/data.router"


const PORT:number = 5000;

// Define API Config
const app:Application = express();

// Middleware Config
app.use(express.json());

// Landing Page
app.get("/",(request:Request,response:Response)=>{
    response.send("<h1>This is Income Expense Landing Page</h1>")
})

// Router
app.use("/data",dataRouter)

// Listening Port Config
app.listen(PORT,()=> {
    console.log(`API is running on http://localhost:${PORT}`);
})
