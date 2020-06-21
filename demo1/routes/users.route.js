const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.index);
router.get("/search", usersController.search);
router.get("/add", usersController.add);
router.get("/:id", usersController.get);
router.post("/add", usersController.postAdd);
module.exports = router;
