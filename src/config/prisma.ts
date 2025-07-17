// import { PrismaClient } from "../generated/prisma";

// export const prisma = new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });

 import {PrismaClient} from "../../prisma/generated/client"
 export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});