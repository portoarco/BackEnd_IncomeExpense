import { Router } from "express";
import { createData, getAllData, getExpenseData, getExpenseDatabyId } from "../controllers/data.controller.ts";

const route = Router();


// router getAllData
route.get("/all",getAllData);
// router createData
route.post("/all",createData)
// router getExpenseData
route.get("/expense",getExpenseData)
// router getExpenseDatabyId (Expense Detail)
route.get("/expense/:id",getExpenseDatabyId)



export default route;