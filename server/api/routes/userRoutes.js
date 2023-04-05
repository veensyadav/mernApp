const express = require("express");

const userController = require("../controllers/userController");
const dataController = require("../controllers/dataController");
const verifyToken = require("../services/verifyToken");

/*
    baseUrl: api/v1/userAuth/
*/
const router = express.Router();

router.post("/signup", userController.userSignup);
router.post("/login", userController.login);

router.get("/get/data", dataController.listOfData);



module.exports = router;

