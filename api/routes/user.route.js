const { Router } = require("express");
const router = Router();

const { test } = require("../controllers/user.controller");

router.route("/test").get(test);

module.exports = router;
