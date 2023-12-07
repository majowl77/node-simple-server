import { Router, Request, Response } from "express";

type Product = {
  name: string;
  price: number;
};

const products: Product[] = [
  { name: "one product", price: 70 },
  { name: "second product", price: 20 },
];

const sayHello = (req: Request, res: Response) => {
  res.status(200).send("Hello, world! ");
};
const getIdFromParams = (req: Request, res: Response) => {
  const testID = req.params.id;
  res.status(200).send("this's the id from the url : " + testID);
};

export const receivedData = (req: Request, res: Response) => {
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
};

module.exports = {
  sayHello,
  getIdFromParams,
  receivedData,
};
