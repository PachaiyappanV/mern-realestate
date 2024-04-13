const { Router } = require("express");
const { verifyUser } = require("../utils/verifyUser");
const router = Router();

const { test, updateUser } = require("../controllers/user.controller");

router.route("/test").get(test);
router.route("/updateUser/:id").post(verifyUser, updateUser);

module.exports = router;
