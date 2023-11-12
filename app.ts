import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = 3002;
const app: Express = express();
app.use(express.json());

app.use("/", require("./routes/indexRouter"));
app.use("/products", require("./routes/productsRouter"));

// app listen
app.listen(PORT, () => {
  console.log(`the server is  at http://localhost:${PORT}`);
});
