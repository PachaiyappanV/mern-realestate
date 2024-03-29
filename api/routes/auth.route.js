const { Router } = require("express");
const router = Router();

const { signup } = require("../controllers/auth.controller");

router.route("/").post(signup);

module.exports = router;
