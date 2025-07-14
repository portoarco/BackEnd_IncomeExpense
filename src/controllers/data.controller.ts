import { Request, Response } from "express";
import db from "../config/db";

// Read Data
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

// Create Data

export const createData = async (req: Request, res: Response) => {
  try {
    const { title, type, category, nominal } = req.body;
    const result = await db.query(
      "insert into expenses (title,type,category,nominal) values ($1,$2,$3,$4) returning *",
      [title, type, category, nominal]
    );
    console.log(result);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Update Data
export const updateDatabyId = async (req: Request, res: Response) => {
  try {
    const { title, type, category, nominal } = req.body;
    const id = req.params.id;
    const result = await db.query(
      `update expenses set title=$1, type=$2, category=$3,nominal=$4 where id=$5 returning *`,
      [title, type, category, nominal, id]
    );
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Delete Data
export const deleteDatabyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      `delete from expenses where id=$1 returning *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .send({ message: `Data dengan id ${id} tidak ditemukan` });
    }
    res
      .status(200)
      .send({
        message: `Data id: ${id} berhasil dihapus`,
        data: result.rows[0],
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
