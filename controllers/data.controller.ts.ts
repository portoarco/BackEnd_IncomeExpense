import { Application, Request, Response } from "express";
import fs from "fs";
import express from "express";
import { v4 as uuid } from "uuid";

// App config
const app: Application = express();
// Middleware Config
app.use(express.json());

// getAllData
export const getAllData = (request: Request, response: Response) => {
  // 1. Ambil data dari db.json lalu konversi ke string
  const rawData = fs.readFileSync("db.json").toString();
  // 2. Konversi ke object JS
  const data = JSON.parse(rawData);
  // 3. Tampilkan response ke client
  response.send(data);
};

// getExpenseData
export const getExpenseData = (request: Request, response: Response) => {
  // 1. Akses semua datanya -> konversi string -> konversi ke obj JS
  const data = JSON.parse(fs.readFileSync("db.json").toString());

  // 2. Akses hanya properti type:expense
  const expenseData = data.filter((item: any) => {
    return item.type === "expense";
  });

  // 3. Error handling bila data tidak ditemukan

  if (expenseData.length === 0) {
    response.status(404).json({ message: "Data tidak ditemukan" });
  }

  // 4. Tampilkan ke user
  response.send(expenseData);
};

// getExpenseDatabyId
export const getExpenseDatabyId = (request: Request, response: Response) => {
  // 1. Akses semua data dari database dan konversi ke object JS
  const data = JSON.parse(fs.readFileSync("db.json").toString());

  // 2. Buat variabel index untuk tampung indeks yang diinput user dari params /parameter url + buatkan variabel untuk tampung tipe
  const id = request.params.id;

  // 3. Cari indeks data dari database berdasarkan indeks user
  const findIndex = data.findIndex((item: any) => {
    return item.id === id;
  });

  //  4. Conditional Validation (Validasi Index dan Tipe Data)
  if (data[findIndex] && data[findIndex].type === "expense") {
    response.send(data[findIndex]);
  } else if (data[findIndex] && data[findIndex].type === "income") {
    response.send({ message: `Data dengan id: ${id} bukan termasuk Expense` });
  } else {
    response.send({ message: `Data dengan id: ${id} tidak ditemukan` });
  }
};

// createNewExpense
export const createData = (request: Request, response: Response) => {
  // 1. Akses data dan konversi ke bentuk obj.json
  const data = JSON.parse(fs.readFileSync("db.json").toString());

  // 2. Ambil input dari user (req.body) dan tampung dalam variabel

  // 3. Buat variabel id untuk menampung uuid
  const newId = uuid();
  //   4. Buat variabel hari untuk menampung hari ini
  const createDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  // 4. Buat variabel newExpense yang menamppung inputan
//   console.log(request.body)

  data.push({
      id: newId,
      date: createDate,
      ...request.body,
  });
  // 5. simpan ke database dengan fs.writefilesync
  fs.writeFileSync("db.json",JSON.stringify(data,null,4))
  // 6. Kirim response (bila sukses/tidak) -> conditional formatting
  response.send({ message: "Tambah Data Sukses", result: data });
};
