import {getAllInterviewReports,generateInterviewReport,getInterviewReportById,generateResumePdf} from "../services/interview.api"
import {useContext,useEffect} from "react"
import {InterviewContext} from "../interview.context"
export const useInterview = ()=>{
    const context = useContext(InterviewContext);
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const{loading,setLoading,report,setReport,reportsList,setReportsList} = context;

    const generateReport = async ({jobDescription,selfDescription,resume})=>{
            setLoading(true);
            let reponse=null;
            try{
                reponse = await generateInterviewReport({jobDescription,selfDescription,resume});
                setReport(reponse.interviewReport);
            }
            catch(error){
                console.error("Error generating interview report:",error);
            }
            finally{
                setLoading(false);
            }
            return reponse.interviewReport;

    }
    const getReportById = async (id)=>{
        setLoading(true);
        let response = null;
        try{
            response = await getInterviewReportById(id);
            setReport(response.interviewReport);
        }
        catch(error){
            console.error("Error fetching interview report:",error);
        }
        finally{
            setLoading(false);
        }
        return response.interviewReport|| null;
    }
    const getAllReports = async ()=>{
        setLoading(true);
        let response = null;
        try{
            response = await getAllInterviewReports();
            setReportsList(response.interviewReports);
        }
        catch(error){
            console.error("Error fetching interview reports:",error);
        }
        finally{
            setLoading(false);
        }
        return response.interviewReports;
    }
    const generatePdf = async ({interviewId})=>{
        setLoading(true);
        let response = null;
        try{
            response = await generateResumePdf({interviewId});
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume_${interviewId}.pdf`);
            document.body.appendChild(link);
            link.click();
        }
        catch(error){
            console.error("Error generating resume PDF:",error);
        }
        finally{
            setLoading(false);
        }
    }
    return {
        loading,
        report, 
        reportsList,
        generateReport,
        getReportById,
        getAllReports,
        generatePdf
    }
}