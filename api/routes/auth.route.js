const { Router } = require("express");
const router = Router();

const { signUp, signIn, google } = require("../controllers/auth.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);

module.exports = router;
