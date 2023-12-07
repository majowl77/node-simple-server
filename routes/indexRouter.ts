import { Router, Request, Response } from "express";
const {
  sayHello,
  receivedData,
  getIdFromParams,
} = require("./../controllers/indexContorller");

const express = require("express");
const router = express.Router();

router.route("/").get(sayHello).post(receivedData);
router.route("/:id").get(getIdFromParams);
module.exports = router;
