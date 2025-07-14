import { Router } from "express";
import { createData, deleteDatabyId, getData, updateDatabyId } from "../controllers/data.controller";

const route = Router();


// getAllData
route.get("/",getData);
// createNewData
route.post("/",createData)
// updateData
route.put("/:id",updateDatabyId)
// deleteData
route.delete("/:id",deleteDatabyId)


export default route;