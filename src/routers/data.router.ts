import { Router } from "express";
// import { createData, deleteExpensebyId, editExpensebyId, getAllData, getExpenseData, getExpenseDatabyId, getTEbyDate } from "../controllers/data.controller.ts.js";
import { getData } from "../controllers/data.controller.ts";

const route = Router();


// getAllData
route.get("/",getData);


export default route;