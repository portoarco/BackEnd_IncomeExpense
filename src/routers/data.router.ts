import { Router } from "express";
import {
  addData,
  deleteData,
  getByCategory,
  getData,
  updateData,
} from "../controllers/data.controller";

const route = Router();

// getAllData
route.get("/", getData);
// addData
route.post("/", addData);
// update data
route.patch("/:id", updateData);
// delete Data
route.delete("/:id", deleteData);
// getByCategoryId
route.get("/by-category/:categoryid", getByCategory);

export default route;
