import { Router, Request, Response } from "express";
const {
  getAllProducts,
  addProduct,
} = require("./../controllers/productsContorller");

const express = require("express");
const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);

module.exports = router;
