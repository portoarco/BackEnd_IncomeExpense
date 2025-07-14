import { Router } from "express";
// import { createData, deleteExpensebyId, editExpensebyId, getAllData, getExpenseData, getExpenseDatabyId, getTEbyDate } from "../controllers/data.controller.ts.js";
import { getData } from "../controllers/data.controller.ts";

const route = Router();

route.get("/all",getData);


export default route;