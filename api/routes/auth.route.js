const { Router } = require("express");
const router = Router();

const { signUp, signIn } = require("../controllers/auth.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
