const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// REGISTER USER BY ADMIN => tao tk cho nhan vien moi
router.post("/register", authController.registerUser);
// LOGIN INTO APP
router.post("/login", authController.loginUser);
// REQUEST REFRESH TOKEN
router.post("/refresh", authController.requestRefreshTokens);
// LOGOUT USER
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);
module.exports = router;
