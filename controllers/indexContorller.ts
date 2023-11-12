import { Router, Request, Response } from "express";

type Products = {
  name: string;
  price: number;
};

const products: Products[] = [
  { name: "one product", price: 70 },
  { name: "second product", price: 20 },
];

const sayHello = (req: Request, res: Response) => {
  res.status(200).send("Hello, world! ");
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
  receivedData,
};
