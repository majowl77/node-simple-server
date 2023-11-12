import { Router, Request, Response } from "express";
const { sayHello, receivedData } = require("./../controllers/indexContorller");

const express = require("express");
const router = express.Router();

router.route("/").get(sayHello).post(receivedData);

module.exports = router;
