import { Router } from "express";
import { createData, deleteExpensebyId, editExpensebyId, getAllData, getExpenseData, getExpenseDatabyId, getTEbyDate } from "../controllers/data.controller.ts";

const route = Router();


// router getAllData
route.get("/all",getAllData);
// router getTotalExpensebyDateRange
route.get("/expense/totalbyDateRange",getTEbyDate)
// router createData
route.post("/all",createData)
// router getExpenseData
route.get("/expense",getExpenseData)
// router getExpenseDatabyId (Expense Detail)
route.get("/expense/:id",getExpenseDatabyId)
// router editExpensebyId 
route.put("/expense/:id",editExpensebyId)
// router deleteExpensebyId
route.delete("/expense/:id",deleteExpensebyId)





export default route;