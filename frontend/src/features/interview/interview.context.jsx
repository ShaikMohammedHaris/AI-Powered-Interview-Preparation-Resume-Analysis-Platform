import {createContext,useContext,useState} from "react";


export const InterviewContext = createContext();
export const InterviewProvider = ({children})=>{
    const[loading,setLoading] = useState(false);
    const [report,setReport] = useState(null);
    const [reportsList, setReportsList] = useState([]);

    return(
        <InterviewContext.Provider value={{loading,setLoading,report,setReport,reportsList,setReportsList}}>
            {children}
        </InterviewContext.Provider>
    )
}