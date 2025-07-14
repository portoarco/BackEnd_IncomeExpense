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

// Create New Data
export const createData = (request: Request, response: Response) => {
  // 1. Akses data dan konversi ke bentuk obj.json
  const data = JSON.parse(fs.readFileSync("db.json").toString());

  // 2. Ambil input dari user (req.body) dan tampung dalam variabel

  // 3. Buat variabel id untuk menampung uuid
  const newId = uuid();

  // 4. Buat variabel newExpense yang menamppung inputan
  //   console.log(request.body)

  data.push({
    id: newId,
    ...request.body,
  });
  // 5. simpan ke database dengan fs.writefilesync
  fs.writeFileSync("db.json", JSON.stringify(data, null, 4));
  // 6. Kirim response (bila sukses/tidak) -> conditional formatting
  response.send({ message: "Tambah Data Sukses", result: data });
};

// =========== EXPENSE ======

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

// edit expense by id
export const editExpensebyId = (request: Request, response: Response) => {
  // 1. Akses semua data dari db.json
  const data = JSON.parse(fs.readFileSync("db.json").toString());
  // 2. Buat variabel penampung untuk
  const id = request.params.id;
  // 3. Cari index dari database
  const findIndex = data.findIndex((item: any) => {
    return item.id === id;
  });
  // 4. Update data berdasarkan index
  data[findIndex] = {
    ...data[findIndex],
    ...request.body,
  };

  // 5. Overwrite data yang lama dan simpan ke db.json
  fs.writeFileSync("db.json", JSON.stringify(data, null, 4));
  //6. Kirim response ke client
  response.send({ message: `Edit data id:${id} success!`, result: data });
};

// Delete expense by id

export const deleteExpensebyId = (request: Request, response: Response) => {
  const data = JSON.parse(fs.readFileSync("db.json").toString());
  const id = request.params.id;
  const findIndex = data.findIndex((item: any) => {
    return item.id === id;
  });

  data.splice(findIndex, 1);

  fs.writeFileSync("db.json", JSON.stringify(data, null, 4));

  response.send({ message: `Delete data id:${id} success`, result: data });
};

// TOTAL EXPENSE BY DATE RANGE

export const getTEbyDate = (request: Request, response: Response) => {
  console.log("Test 123");
  // 1. Ambil data start date dan end date dengan query
  const startDate = request.query.start as string;
  const endDate = request.query.end as string;
  // 2. Konversi date start dan end ke timestamp
  const tsStartDate = new Date(startDate).getTime()
  const tsEndDate = new Date(endDate).getTime()
  // console.log(tsStartDate)
  // console.log(tsEndDate)
  // 3. Akses data 
  const data = JSON.parse(fs.readFileSync("db.json").toString())

  // 4. Buat variabel awal penampung total nominal
  let totalExpensebyDateRange = 0
  // 5. Loop semua data + validasi 
  const databyDateRange = data.filter((item:any)=> {
    const itemDate = new Date(item.date).getTime()

    if(itemDate >= tsStartDate && itemDate <= tsEndDate){
      return 
    }

  })
  // Validasi untuk type item --> ambil item.date + konversi --> bandingkan hasilnya --> bila sesuai range --> akses nominalnya, masukkan ke totalExpensebyDateRange
  // 6. Kirim Response ke client

  response.send(databyDateRange)





   
};
