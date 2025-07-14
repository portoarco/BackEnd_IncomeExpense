import { Router } from "express";
import { createData, deleteExpensebyId, editExpensebyId, getAllData, getExpenseData, getExpenseDatabyId, getTEbyDate } from "../controllers/data.controller.ts";

const route = Router();


// router getAllData
route.get("/data",getAllData);
// router createData
route.post("/data",createData)
// router getExpenseData
route.get("/expense",getExpenseData)
// router getTotalExpensebyDateRange
route.get("/expense/totalbyDateRange",getTEbyDate)

// router getExpenseDatabyId (Expense Detail)
route.get("/expense/:id",getExpenseDatabyId)
// router editExpensebyId 
route.put("/expense/:id",editExpensebyId)
// router deleteExpensebyId
route.delete("/expense/:id",deleteExpensebyId)





export default route;