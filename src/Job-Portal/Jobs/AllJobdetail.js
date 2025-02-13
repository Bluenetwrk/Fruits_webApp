import React from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import profileDp from "../img/user_3177440.png"
import "./Allobs.module.css"
import HTMLReactParser from 'html-react-parser'
import StProfile from "../Profile/StudentProfile"
import EMpProfile from "../Profile/EmployeeProfile"

function Answerdetails(props) {
  
  let userid = JSON.parse(localStorage.getItem("StudId")) || JSON.parse(localStorage.getItem("EmpIdG"))

  const [CommentName, setCommentName] = useState("")
  const [CommentID, setCommentID] = useState()
  
  async function getProfile() {
    let userId = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userId +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${userId}`, {headers})
        .then((res) => {
            let result = res.data.result
            
            setCommentName(result.name)
        }).catch((err) => {
           
        })
}
let empId = JSON.parse(localStorage.getItem("EmpIdG"))
async function getEmpProfile() {
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
      .then((res) => {
          let result = res.data.result
          
          setCommentName(result.name)
          

      }).catch((err) => {
          
      })
}

useEffect(() => {
  if(empId){
    getEmpProfile()
  }else{
    getProfile()
  }
}, [])
  
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)
  const [jobs, setJobs] = useState([])
  const [comments, setcomments] = useState({
    id:userid,
    name:"",
    comment:""
  })

  const [clickedJobId, setclickedJobId] = useState() //for single job loader

function changeComments(e){
  
    setcomments({ ...comments, comment: e.target.value, name:CommentName})
}


  const navigate = useNavigate()

  let params = useParams();

  async function getjobs() {
    
    const headers = { authorization: 'BlueItImpulseWalkinIn'};
    await axios.get(`/jobpost/getjobs/${atob(params.id)}`, {headers})
      .then((res) => {
        let result = (res.data)
        console.log(result)
        setJobs(result)
        setjobdescription(result.jobDescription)
        setjobSeekerId(result.jobSeekerId)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])


  
  return (
    <>

        <h2 style={{marginLeft:"10px", fontWeight:"800", marginTop:"15px", marginBottom:"-15px"}}> Blogs  </h2>

    <div style={{display:"flex", marginTop:"20px"}}>
                            
             <button style={{  color:"grey", marginTop:"10px", marginLeft:"8%", cursor:"pointer",}} 
             onClick={()=>{navigate(-1)}}>Back</button>
              
    </div>

      {screenSize.width>850 ?

        <>
       
  
  {/* <h1 style={{textAlign:"center", fontSize:"xx-large"}}>{jobs.jobTitle[0].toUpperCase()+jobs.jobTitle.slice(1)}</h1> */}
  <h1 style={{textAlign:"center", fontSize:"xx-large"}}>{jobs.jobTitle}</h1>
<div style={{marginLeft:"30px"}}>
  <span>Posted by : {jobs.companyName}</span> &nbsp;|  
  &nbsp; <span> Posted on : {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}</span> &nbsp; |
  &nbsp; <span>Experience : {jobs.experiance}</span> &nbsp;|  
  &nbsp; <span>Location : {jobs.jobLocation}</span>&nbsp; |  
  &nbsp; <span>Job Type : {jobs.jobtype}</span>&nbsp; |  
  &nbsp; <span>Qualification : {jobs.qualification}</span>&nbsp; |  
  &nbsp; <span>Salary : {jobs.salaryRange}</span> 
  {/* <span>Posted by {jobs.qualification}</span> |   */}
  {/* <span>Posted by {jobs.qualification}</span> |   */}

  
<p>Skills : {jobs.skills} </p>
</div>

  <table style={{marginLeft:"6px", marginTop:"0px", width:"98.8%", borderCollapse: "collapse",border:"none"}}>         
  
  <tr style={{border:"none"}}>
    <td colSpan={2} style={{border:"none"}}>
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >


              <>
                <div className={styles.JobCard} >
                <div className={styles.JobTitleDateWrapper}>
        <p className={styles.QuestionjobTitle} >{jobs.jobTitle}</p>
        <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p></div>
     
     <table style={{marginLeft:"6px", marginTop:"0px", width:"95.5%"}}>         
  
  <tr >
    <td colSpan={2} >
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>           
                </div>
              </>

            </div>

          </>


              }
                          
        </>

  )
}

      export default Answerdetails