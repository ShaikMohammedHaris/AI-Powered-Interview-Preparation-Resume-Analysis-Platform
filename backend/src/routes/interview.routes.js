const express = require("express");
const interviewController = require("../controllers/interview.controller");
const interviewRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware"); 
/**
 * @route POST /api/interview
 * @description Generate an interview preparation report for the candidate based on their resume, self-description, and job description.
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController);
/**
 * @route GET /api/interview/:interviewId
 * @description Get the details of a specific interview report by its ID.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);
/**
 * @route GET /api/interview/
 * @description Get the list of all interview reports logged in user.
 * @access private
 */

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);
interviewRouter.post("/resume/pdf/:interviewId", authMiddleware.authUser, interviewController.generateResumePdfController);
module.exports = interviewRouter;