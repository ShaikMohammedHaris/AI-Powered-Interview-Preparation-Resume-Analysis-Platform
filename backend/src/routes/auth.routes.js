const express = require("express"); 
const authController = require("../controllers/auth.controller");
const authMiddleWare = require("../middlewares/auth.middleware");
const authRouter = express.Router();

authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route get /api/auth/logout
 * @description logout user by clearing the token cookie
 * @access public
 */
authRouter.get("/logout",authController.logoutUserController)
/**
 * @route Get/api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me",authMiddleWare.authUser,authController.getMeController)

module.exports = authRouter;