const pdfparse = require("pdf-parse");
const {generateInterviewReport,generateResumePdf} = require("../services/ai.service")
const InterviewReportModel = require("../models/interviewReport.model");



async function generateInterviewReportController(req,res){
    const data = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const resumeContent = data.text;
    const {selfDescription, jobDescription} = req.body;
    const interviewReportByAi = await generateInterviewReport({
        resume :resumeContent,
        selfDescription,
        jobDescription
    });
    const interviewReport =await InterviewReportModel.create({
        user:req.user.id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })
    res.status(200).json({message:"Interview report generated successfully",interviewReport});
}

/***
 * @description Get the details of a specific interview report by its ID.
 */
async function getInterviewReportByIdController(req,res){
    const {interviewId} = req.params;
    const interviewReport = await InterviewReportModel.findOne({_id:interviewId,user:req.user.id});
    if(!interviewReport){
        return res.status(404).json({message:"interview report not found"})
    }
    res.status(200).json({message:"interview report fetched successfully",interviewReport})

}

async function getAllInterviewReportsController(req,res){
    const interviewReports = await InterviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
    res.status(200).json({message:"interview reports fetched successfully",interviewReports})
}

async function generateResumePdfController(req,res){
    const {interviewId} = req.params;
    const interviewReport = await InterviewReportModel.findById(interviewId);
    console.log(interviewReport);
    if(!interviewReport){
        return res.status(404).json({message:"interview report not found"})
    }
    const {resume,selfDescription,jobDescription} = interviewReport;
    const pdfBuffer = await generateResumePdf({resume,selfDescription,jobDescription});
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
        
    })
    res.send(pdfBuffer);
}
module.exports = {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController,generateResumePdfController};