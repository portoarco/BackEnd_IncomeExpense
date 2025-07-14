import { Request, Response } from "express";
import db from "../config/db";

export const getData = async (req: Request, res: Response) => {
  try {
    const data = await db.query("Select * from expenses");
    console.log(data);
    res.status(200).send(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
