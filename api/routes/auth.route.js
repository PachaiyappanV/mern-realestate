const { Router } = require("express");
const router = Router();

const { signup } = require("../controllers/auth.controller");

router.post("/signup", signup);

module.exports = router;
