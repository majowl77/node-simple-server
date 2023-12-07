import { Router, Request, Response } from "express";
import { readFile, writeFile } from "fs";

const fs = require("fs");

const getAllProducts = (req: Request, res: Response) => {
  fs.readFile(
    "./products.json",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Internal Server Error ",
        });
      } else {
        res.status(201).send({
          success: true,
          message: "Data received and logged. ",
          payload: JSON.parse(data),
        });
      }
    }
  );
};

const addProduct = (req: Request, res: Response) => {
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
};

module.exports = {
  getAllProducts,
  addProduct,
};
