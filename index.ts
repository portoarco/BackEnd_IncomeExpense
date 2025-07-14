import express, { Application,Request,Response } from "express";
import dataRouter from "./src/routers/data.router"


const PORT:number = 6000;

// Define API Config
const app:Application = express();

// Middleware Config
app.use(express.json());

// Landing Page
app.get("/",(request:Request,response:Response)=>{
    response.send("<h1>This is Income Expense Landing Page</h1>")
})

// Router
app.get("/test",(req:Request,res:Response)=>{
    res.send("<h1>test</h1>")
})
// app.use("/expenses",dataRouter)

// Listening Port Config
app.listen(PORT,()=> {
    console.log(`API is running on http://localhost:${PORT}`);
})
