import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs";
const fs = require("fs");

dotenv.config();

const PORT: number = 3003;
const app = express();
app.use(express.json()); // Middleware to parse JSON in the request body

type Products = {
  name: string;
  price: number;
};

const products: Products[] = [
  { name: "one product", price: 70 },
  { name: "second product", price: 20 },
];

// GET endpoints
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, world! ");
});
app.get("/products", (req: Request, res: Response) => {
  fs.readFile(
    "./products.json",
    (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Internal Server Error ",
        });
      } else {
        res.status(201).send({
          success: true,
          message: "Data received and logged. ",
          payload: JSON.stringify(data),
        });
      }
    }
  );
});

// POST endpoints
app.post("/", (req: Request, res: Response) => {
  try {
    let postData: string = JSON.stringify(products);

    req.setEncoding("utf8");

    req.on("data", (data: string) => {
      postData += data;
    });

    req.on("end", () => {
      console.log("Received data:", postData);
      res.status(201).json({
        success: true,
        message: "Data received and logged.",
        payload: JSON.parse(postData),
      });
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(400).json({
      success: false,
      message: "Bad Request: Invalid JSON data",
    });
  }
});
app.post("/products", (req: Request, res: Response) => {
  // Just to check
  const sampleProduct = {
    name: "Sample Product",
    price: 25.99,
    category: "Electronics",
  };
  const postBody: any = req.body;
  if (!postBody) {
    res.status(400).send("Bad Request: Empty request body");
    return;
  }
  try {
    readFile("products.json", (error: any, existingData: Buffer) => {
      if (error) {
        res.status(500).send("Internal Server Error");
        return;
      }
      const products = JSON.parse(existingData.toString());
      products.push(postBody);

      writeFile("products.json", JSON.stringify(products), (error: any) => {
        if (error) {
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(201).send({
          success: true,
          message: "Product data received and saved in the products.json file",
        });
      });
    });
  } catch (error) {
    res.status(400).send("Bad Request: Invalid JSON data");
  }
});

// app listen
app.listen(PORT, () => {
  console.log(`the server is  at http://localhost:${PORT}`);
});
