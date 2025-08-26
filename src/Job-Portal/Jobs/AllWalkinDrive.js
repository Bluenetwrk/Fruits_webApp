import React, { useState, useEffect, useRef } from 'react';
import CompanyLogo from '../img/company-logo.png'
import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Puff, TailSpin } from 'react-loader-spinner'
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
// import {SwipeableViews} from 'react-swipeable-views-v18';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../Footer/Footer';
import { jobTags } from '../Tags'
import HTMLReactParser from 'html-react-parser'

const options = [
  { value: "bangalore", label: "Bangalore, India", img:location},
  { value: "san Francisco", label: "San Francisco, USA", img:location},
  { value: "new york", label: "New York, USA", img:location},
  { value: "sydney", label: "Sydney, Australia", img:location},
  { value: "london", label: "London, UK", img:  location},
  { value: "berlin", label: "Berlin, Germany", img:location},
];


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 14
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


function AllWalkinDrive({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  jobTagsIds,setJobTagsIds,PageLoader,setPageLoader,totalCount,settotalCount,search,getjobs,gettotalcount,searchIcon
  ,searchClick,setSearchClick,ShowSideNave,setShowSideNave,showMobileSearchIcon,setShowMobileSearchIcon,sortedFilteredDriveJobs
}) {

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)

  const [NotFound, setNotFound] = useState("")
  const screenSize = useScreenSize();
  const [allWalkindrive,setAllWalkinDrive] = useState([])
  const [Loader, setLoader] = useState(false)
  const [clickedJobId, setclickedJobId] = useState() 

  let JobLocationTags = ["Bangalore"]

  let navigate = useNavigate()

  let adminLogin = localStorage.getItem("AdMLog")

  // useEffect(() => {
  //   let EmployeeAuth = localStorage.getItem("EmpLog")
  //   if (EmployeeAuth) {
  //     navigate("/Search-Candidate")
  //   }
  // }, [])

  // useEffect(() => {
  //   let studentAuth = localStorage.getItem("StudLog")
  //   if (studentAuth) {
  //     navigate("/alljobs")
  //   }
  // }, [])
  // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(10)

  const[jobsPerPageValue,setJobsPerPageValue]=useState(10);


  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = jobs.slice(firstIndex, lastIndex)//0,5

  // const npage = Math.ceil(totalCount / recordsPerPage) // last page
  const npage=1;

  async function gettotalcount() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/jobpost/getTotalCount", { headers })
      .then((res) => {
        // console.log(res.data.result)
        settotalCount(res.data.result)
      }).catch((err) => {
        alert("something went wrong")
      })
  }

  async function getjobs() {
    setPageLoader(true)
    let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    // const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    // await axios.get("/jobpost/getHomejobs", { headers })
    await axios.get("/walkinRoute/allactivewalkins",{headers})
      .then((res) => {
        let result = (res.data)
        console.log(result)
        gettotalcount()
// console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
        setAllWalkinDrive(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        console.log(err)
        alert("some thing went wrong")
      })
  }

  // useEffect(()=>{
  //   console.log(allWalkindrive)
  // },[allWalkindrive])

  useEffect(() => {
    if (jobTagsIds.length < 1) {
      getjobs()
    } else {
      getTagId();
    }
  }, [currentPage, recordsPerPage])

  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  async function applyforDrive(jobId) {
       let date = new Date()
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    setclickedJobId(jobId)
    setLoader(true)

      await axios.put(`/walkinRoute/updatforwalkinApply/${jobId}`, { jobSeekerId, date }, { headers })
        .then((res) => {
          
          if (res.data) {
            console.log(res.data)
            setLoader(false)
            getjobs()
          }
        }).catch((err) => {
          alert("server issue occured", err)
        })
  }


  async function applyforJob(id) {
    if(StudentAuth){
         applyforDrive(id)
    }
    else if(EmployeeAuth){

    }
    else{
    navigate("/JobSeekerLogin", { state: { Jid: id } })
    }
   
  }
  async function applyforOtherJob(Link) {
    
    window.open(`${Link}`)
  }

  async function searchIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }



  async function search(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }

  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)
  }

  function sortbyNewjobs() {

    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setJobs(newjobSort)
  }


  function SdescendingOrder() {
    let newJobs = [...jobs]
  
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setJobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setJobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setJobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setJobs(sorted)
  }
  function checkEmpHalf(empId, e) {

    navigate(`/CheckEmpHalfProfile/${empId}`)

  }

  

  const [jobLocation, setjobLocation] = useState("AllL")
  const [jobTitle, setjobTitle] = useState("")
  
  async function getjobTitleAll(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }
  async function getjobsAllLoc(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
      })
  }

  async function JobtitleFilter(jobTitle) {
    await axios.get(`/jobpost/getjobTitle/${jobTitle}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  async function getBothFiltered(jobTitle) {

    await axios.post(`/jobpost/getBothjobFilter/${jobLocation}`, { jobTitle })
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  function firstPage() {
    setCurrentPage(1)
  }

  function previous() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCurrent(id) {
    setCurrentPage(id)
  }
  function next() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
  function last() {
    setCurrentPage(npage)
  }

  function handleRecordchange(e) {
    // sessionStorage.setItem("recordsperpageHome", JSON.stringify(e.target.value));
    // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
    setJobsPerPageValue(Number(e.target.value));
    setrecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const [jobTagIds, setjobTagIds] = useState([])

  useEffect(() => {
    if (jobTagsIds.length > 0) {
      getTagId();
    }
  }, [jobTagsIds])

  let ids = jobTagsIds.map((id) => {
    return (
      id._id
    )
  })
  const uniqueList = [...new Set(ids)];
  async function getTagId() {
    settotalCount(uniqueList.length)
    await axios.get(`/jobpost/jobTagsIds/${uniqueList}`, {
      params: { currentPage, recordsPerPage }
    })
      .then((res) => {
        
        let result = res.data
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        if (count == 2) {
          setCurrentPage(1)
        }

      })
  }

  useEffect(()=>{
    if(Active.length>0){
      changeTags()
    }
  },[Active])


  async function filterByJobTitle(key) {

    if (count == 1) {
      setJobs([])
    }
    setCount(prev => prev + 1)
    const isIndex = Active.findIndex((present) => {
      return (
        present === key
      )
    })
    if (isIndex < 0) {
      
      
      var updatedActive = [...Active, key]; 
      setActive(updatedActive);

    } else {
      const IndexId = Active.findIndex((present) => {
        return (
          present == key
        )
      })
      Active.splice(IndexId, 1)
      if (Active.length === 0) {
        getjobs()
        return false
      }
    
      changeTags()
    }}
    async function changeTags(key){
     

    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/jobpost/getTagsJobs/${Active}`)
      .then((res) => {
        let result = (res.data)
        
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobTagsIds(sortedate)
        
      })
  }

  async function getLocation(jobLocation) {
    setCount(1)
    setActive(["Banglore"])
    setFiltereredjobs(jobLocation)
    setNoPageFilter(true)

    await axios.get(`/jobpost/getjobLocation/${jobLocation}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
      
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  const [checkBoxValue, setCheckBoxValue] = useState([])
  const [check, setCheck] = useState(true)

  async function ArchiveCheckBoxArray() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.delete(`/jobpost/ArchiveCheckBoxArray/${checkBoxValue}`, { headers })
      .then((res) => {
        if (res.data === "success") {
          getjobs()
          alert("Archived succesfully")
          window.location.reload()
        }
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function deleteCheckedJobs() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.delete(`/jobpost/deleteCheckBoxArray/${checkBoxValue}`, { headers })
      .then((res) => {
        if (res.data === "success") {
          getjobs()
          alert("deleted succesfully")
          window.location.reload()
        }
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  function checkBoxforDelete(id) {

    const checkedid = checkBoxValue.findIndex((checkedid) => {
      return (
        checkedid === id
      )
    })
    if (checkedid < 0) {
      setCheckBoxValue([...checkBoxValue, id])
    } else {
      
      let removeId = checkBoxValue.filter((foundId) => {
        return (
          foundId !== id
        )
      })
      setCheckBoxValue(removeId)
    }
  }
 

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  //  const[searchClick,setSearchClick]=useState(false)
  // const driveJobs = [
  //   {
  //     jobTitle: "Software Engineer",
  //     postedBy: "HR Manager",
  //     companyName: "Tech Corp",
  //     jobType: "Full-Time",
  //     driveTime: "9:00 AM",
  //     driveDate: "2025-03-25",
  //     location: "Bengaluru",
  //     ctc: "10 LPA",
  //     experience: "2-4 years",
  //     qualification: "B.Tech/MCA",
  //     skillsRequired: ["React", "Node.js", "MongoDB"],
  //     apply: "https://apply-link.com/1",
  //   },
  //   {
  //     jobTitle: "Frontend Developer",
  //     postedBy: "Recruiter",
  //     companyName: "InnovateX",
  //     jobType: "Remote",
  //     driveTime: "10:00 AM",
  //     driveDate: "2025-03-24",
  //     location: "Remote",
  //     ctc: "8 LPA",
  //     experience: "1-3 years",
  //     qualification: "B.Tech/BCA",
  //     skillsRequired: ["HTML", "CSS", "JavaScript"],
  //     apply: "https://apply-link.com/2",
  //   },
  //   {
  //     jobTitle: "Data Analyst",
  //     postedBy: "HR Lead",
  //     companyName: "DataWorks",
  //     jobType: "Contract",
  //     driveTime: "11:00 AM",
  //     driveDate: "2025-03-26",
  //     location: "Mumbai",
  //     ctc: "6 LPA",
  //     experience: "1-2 years",
  //     qualification: "B.Sc/M.Sc",
  //     skillsRequired: ["Python", "SQL", "Power BI"],
  //     apply: "https://apply-link.com/3",
  //   },
  // ];
  
  // const processDriveJobs = (driveJobs) => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Normalize today's date for comparison
  
  //   return driveJobs
  //     .map((job) => ({
  //       ...job,
  //       dateObj: new Date(job.driveDate), // Convert driveDate string to Date object
  //     }))
  //     .sort((a, b) => a.dateObj - b.dateObj) // Sort by driveDate
  //     .filter((job) => job.dateObj >= today) // Keep only today or future drive dates
  //     .map(({ dateObj, ...rest }) => rest); // Remove temporary dateObj
  // };
  
  // const sortedFilteredDriveJobs = processDriveJobs(driveJobs);
  
  // console.log(sortedFilteredDriveJobs);
  
  
  let StudentAuth = localStorage.getItem("StudLog")
  let EmployeeAuth = localStorage.getItem("EmpLog")
 
  const applyForDrive=(Link)=>{
    // console.log("thisis",StudentAuth)
    if(StudentAuth===null && EmployeeAuth===null)
     navigate("/JobSeekerLogin")
    else{
    window.open(`${Link}`)
    }
  }


  const [activeAlertId, setActiveAlertId] = useState(null);
  
  const handleApplyClick = (id) => {
    setActiveAlertId(id);
  };
  
  const handleOkClick = (id) => {
    setActiveAlertId(null); // close alert
    applyforJob(id);
  };
  
  const handlecancelClick = () => {
    setActiveAlertId(null); 
  };
  

  const alertRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicked outside alert box and it's open
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setActiveAlertId(null); // close the alert
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const selectedTag=useRef("")
  const updateTag=(tag)=>{
    selectedTag.current=tag
  }


  const deregister=async(id)=>{
    let userid = JSON.parse(localStorage.getItem("StudId"))
const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
setclickedJobId(id)
setLoader(true)
   await axios.put(`/walkinRoute/DeleteWalkinApplied/${id}`, { jobSeekerId }, { headers })
     .then((res) => {
       if(res.data==="success"){
         getjobs()
         setLoader(false)
       }else{
         alert("some thing wrong")
       }
     }).catch((err) => {
       alert("server error occured")
     })
 }
  
  return (
    <>
      {screenSize.width > 850 ?

        <>
          <div className={adminLogin ? styles.HomeNavConetenetWrapperAdmin : styles.HomeNavConetenetWrapper}>
            {/* <div className={styles.LocationFilterWrapper}>
              
        <div ref={dropdownRef} style={{ position: "relative" }}>
      
      <div style={{ display: "flex", marginLeft: "-40px", marginTop: "-5px" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#007bff",
          }}
        >
          <img className={styles.jobLocationImage} src={location} alt="Location" />
        </button>
        <p style={{ marginTop: "17px", fontWeight: "bold", color: "white" }}>
          {selectedOption?.label}
        </p>
      </div>

     
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            left: "-43px",
            background: "white",
            color: "black",
            borderRadius: "20px",
            width: "160px",
            padding: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
         
          <div
            style={{
              position: "absolute",
              top: "-9px",
              left: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          ></div>

        
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={option.img}
                  alt={option.label}
                  style={{ width: "22px", height: "22px", marginRight: "12px" }}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

            </div> */}
            
          </div>
          
        </>
        : ""
      }
      {/* <h1>Nikita is working on this development</h1> */}
      {checkBoxValue.length > 0 ?
        <>
          <button style={{
            backgroundColor: "blue", border: "none", color: "white",
            padding: "5px 10px", fontWeight: "bold", cursor: "pointer"
          }} onClick={() => { ArchiveCheckBoxArray() }}>Archive</button>

          <button style={{
            backgroundColor: "red", border: "none", color: "white", marginLeft: "5px",
            padding: "5px 10px", fontWeight: "bold", cursor: "pointer"
          }} onClick={() => { deleteCheckedJobs() }}>Delete</button>
        </>
        : ""
      }

      {screenSize.width > 850 ?
        <>
         

         <h2 style={{marginLeft:"10px", marginTop:"55px"}}>Walkin Drive</h2>
          <div className={styles.JobtitleFilterWrapper} style={{marginTop:"-10px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                    tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                    className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                      styles.TagHeading :
                      //  Active === tags.value ? 
                      Active.findIndex((present) => {
                        return (
                          present === tags.value
                        )
                      }) >= 0 ?
                        styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value) }}>{tags.value} </button>

                )
              })
            }
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nopageFilter ?
            
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>
                {jobs.length} </span>Jobs with following matching tags:
                <span style={{ color: "blue" }}>{Active.toString()}</span></p>
              :
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Showing {firstIndex + 1} to {lastIndex} latest drives</p>
            }
            <div className={styles.navigationWrapper}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
    
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select> drives per page
          </div>
         
          <div className={styles.Uiwarpper}>
            <ul className={styles.ul} style={{ color: 'white', fontWeight: "bold" }}>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Jtitle}`}>Job Title</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" ,width:"9.5%"}} className={`${styles.li} ${styles.Source}`}>Drive Date/ Drive Time</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.CompanyName}`}>Company Name</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.JobType}`}>JobType</li>
              {/* <li className={`${styles.li} ${styles.HliDescription}`}><b>Job description</b></li> */}
              {/* <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.date}`}>Drive Date
                <p className={styles.arrowWrapper} >
                  <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`} ></i>
                  <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li> */}
              
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Location}`}>Venue</li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.Package}`}>CTC
                <p className={styles.arrowWrapper}>

                  <i onClick={SdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={SascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.experiance}`}>Experience
                <p className={styles.arrowWrapper}>

                  <i onClick={EdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={EascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.qualification}`}>Qualification</li>


              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Skills}`}>Skills Required</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Apply}`}>Register</li>

            </ul>
            {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            }
            {
              allWalkindrive.length > 0 ?
                allWalkindrive
                  .map((items, i) => {
                    return (

                      <ul className={styles.ul} key={i}>
                        {/* } */}
                        {EmployeeAuth?
                          <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle}</li>
                          :       
                        <li className={`${styles.li} ${styles.Jtitle}`}  style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}  onClick={() => navigate(`/Drivedetails/${btoa(items._id)}?index=${i}`, {state: {selectedTag, },})}>{items.jobTitle}</li>
                        
                      } 
                        <li className={`${styles.li} ${styles.Source}`} style={{width:"9.5%"}} >

                        {/* {new Date(items.driveDate).toLocaleDateString("en-IN")}/{items.time && `${((+items.time.split(":")[0] % 12) || 12)}:${items.time.split(":")[1]} ${+items.time.split(":")[0] >= 12 ? "PM" : "AM"}`} */}
                        {new Date(items.driveDate).toLocaleDateString("en-IN")}/{items.StartTime}

                          {/* <p>
  {new Date(items.time).toLocaleDateString("en-IN")} /{" "}
  {new Date(items.time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
  })}
</p> */}

</li>

                        {
                          !items.Source ?

                            <li className={`${styles.li} ${styles.CompanyName}`}
                                >

                             
                              {items.companyName}</li>
                            :
                            <a  className={`${styles.li} ${styles.CompanyName}`} target="_blank" >
                             
                              {items.Source}

                            </a>

                        }

                       

                        <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>
                        <li className={`${styles.li} ${styles.Location}`}>{items.venue}</li>
                        <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange==="Not disclosed" ||items.salaryRange==="" ? "Not Disclosed":items.salaryRange+"LPA" }</li>
                        <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}Yrs</li>
                        <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                        <li className={`${styles.li} ${styles.Skills}`}>{items.skills}
                        </li>

                        <li className={`${styles.li} ${styles.Apply}`}>
                        <div  ref={alertRef} style={{position:"relative"}}>
        {    
        items.jobSeekerId?.find((jobseeker) => {
          return (
            jobseeker.jobSeekerId == jobSeekerId
          )
        })
          ?

          <button onClick={() => deregister(items._id)}  style={{fontSize:"12px", height:"30px"}} className={styles.Appliedbutton} title='Thanks for signing up. Check your email for walk-in drive details.' > Registered <span style={{ fontSize: '12px' }}>&#10004;</span>
            <span className={styles.Loader}>
             {Loader && items._id === clickedJobId ? (
               <TailSpin color="white" height={16} width={16} />
             ) : null}
           </span>
           </button>
          :
(
  EmployeeAuth ? (
    <button className={styles.applyRegisterButton} onClick={() => navigate(`/Drivedetails/${btoa(items._id)}?index=${i}`, {state: {selectedTag, },})}>
      <div style={{ display: "flex", width: "81px", alignItems: "center", justifyContent: "center", gap: "6px", paddingRight: "0px" }}>
        View
      </div>
    </button>
  ) : (
    <button style={{width:"84px"}} className={styles.applyRegisterButton} onClick={() => applyforJob(items._id)}>
      <div style={{ display: "flex", width: "81px", alignItems: "center", justifyContent: "center", gap: "6px", paddingRight: "0px" }}>
        Register
        {Loader && items._id === clickedJobId && (
          <TailSpin height={16} width={16} color="white" />
        )}
      </div>
    </button>
  )
)



                  }

      {/* {activeAlertId === items._id && (
        <div
        style={{
          width: '300px',
          padding: '20px',
          backgroundColor: 'rgb(40,4,99)',
          color: 'white',
          fontSize: '12px',
          borderRadius: '5px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
        
        > 
        <strong style={{color:"red", textAlign:"center", fontSize:"14px"}}>NOTICE</strong><br></br>
          ITWALKIN.com never charges fees for job applications. If you encounter misuse or payment requests, report it through our website.<br></br>
          <br></br>
          You will be redirected to the career page of        {
                          !items.Source ?

                            <span>

                              {items.companyName}</span>
                            :
                            <span>
                             
                              {items.Source}

                            </span>

                        }. 
          ITWalkin is not the authorised partner of this company
                <div ref={alertRef} style={{ marginTop: '15px', display:"flex", justifyContent:"center", gap:"5px" }}>
            <button
              onClick={() => handleOkClick(items._id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Ok
            </button>
            <button
              onClick={handlecancelClick }
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </div>
                            
                                

                         
                        </li>
                      </ul>          
                    )
                  })
                  : <p style={{ marginLeft: "47%", color: "red" }}>No Walkin Drives</p>
                  }
                  
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "14px", marginLeft: "10px" }} >
              Show  <select onChange={(e) => { handleRecordchange(e) }}>
                {/* <option selected={lastIndex === 10} value={10}>10</option>
                <option selected={lastIndex === 25} value={25}>25</option>
                <option selected={lastIndex ==
                <option selected={lastIndex === 100} value={100}>100</option> */}
                <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
              </select>  drives per page
            </div>

            <div className={styles.navigationWrapper}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>

          </div>
         

        </>
        // Mobile View
        :
        <>
        
         {/* <div className={styles.blogSearchContainer}>
             <i style={{ visibility:showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer" , marginLeft:"41px",marginTop:"-38px", position:"fixed",zIndex:"999"}} onClick={() => { searchIcon(searchKey) ;setSearchClick((currentvalue)=>!currentvalue);setShowMobileSearchIcon((currentvalue)=>!currentvalue);setShowSideNave((currentvalue)=>!currentvalue)}}
              class="searchicon fa fa-search" ></i> */}
            {/* <input style={{visibility:searchClick?"visible":"hidden"}} className={styles.blogInputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} /> */}
          {/* </div> */}
          {/* {!(StudentAuth||EmployeeAuth)&&
          (  <div style={{position:"fixed",zIndex:"999",top:"-4px",left:"175px"}}>
            <div ref={dropdownRef} style={{ position: "relative" }}>
        <div style={{ display: "flex", marginLeft: "-45px", marginTop: "11px",position:"fixed" }}>
             <button
               onClick={() => setIsOpen((prev) => !prev)}
               style={{background: "none",border: "none",cursor: "pointer",fontSize: "24px",color: "#007bff",}}>
               <img className={styles.jobLocationImage} src={location} alt="Location" />
             </button>
             <p style={{ marginTop: "17px", fontWeight: "bold", color: "white",width:"113px" }}>
               {selectedOption?.label}
             </p>
           </div>
     
          
           {isOpen && (
             <div
               style={{
                 position: "fixed",
                 top: "57px",
                 left: "126px",
                 background: "white",
                 color: "black",
                 borderRadius: "20px",
                 width: "154px",
                 padding: "15px",
                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                 animation: "fadeIn 0.2s ease-in-out",
               }}
             >
               
               <div
                 style={{
                   position: "absolute",
                   top: "-9px",
                   left: "25px",
                   width: "0",
                   height: "0",
                   borderLeft: "10px solid transparent",
                   borderRight: "10px solid transparent",
                   borderBottom: "10px solid white",
                 }}
               ></div>
     
             
               <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                 {options.map((option) => (
                   <li
                     key={option.value}
                     onClick={() => handleSelect(option)}
                     style={{
                       display: "flex",
                       alignItems: "center",
                       padding: "10px",
                       cursor: "pointer",
                       borderRadius: "10px",
                     }}
                   >
                     <img
                       src={option.img}
                       alt={option.label}
                       style={{ width: "22px", height: "22px", marginRight: "12px" }}
                     />
                     <span>{option.label}</span>
                   </li>
                 ))}
               </ul>
             </div>
           )}
         </div>
             </div> 
     
     )
          } */}
        <>
        
          {/* ...................... All Filter for Mobile */}
<div className={styles.MobLocationFilterWrapper}>
  
          </div>
          <h2 style={{marginLeft:"10px",marginTop:"2px" }}>Walkin Drive</h2>
          <div className={styles.JobtitleFilterWrapperMobile} style={{height:"101px", marginLeft:"9px",marginTop:"-6px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                    tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                    className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                      styles.TagHeading :
                      //  Active === tags.value ? 
                      Active.findIndex((present) => {
                        return (
                          present === tags.value
                        )
                      }) >= 0 ?
                        styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value) }}>{tags.value} </button>

                )
              })
            }
          </div>
 
          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
             
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  drives per page
          </div>
          
          <div className={styles.navigationWrapper} style={{textAlign:"left",marginLeft:"6px"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", marginLeft: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
            </div>
            {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }
          <div id={styles.JobCardWrapper} >
            {

              allWalkindrive.length> 0 ?

              allWalkindrive.map((job, i) => {
                  return (
                    <>
                      <div className={styles.JobCard} key={i}>
                      
                          <div style={{marginTop:"-12px"}}>
                        <div className={styles.JobTitleDateWrapper} style={{display:"flex",gap:"16px"}}>
                          {EmployeeAuth?
                            <p className={styles.jobTitle} style={{textDecoration:"none", whiteSpace:"normal"}}>{job.jobTitle} </p>
                              :
                          <p className={styles.jobTitle} onClick={() => navigate(`/Drivedetails/${btoa(job._id)}?index=${i}`, {state: {selectedTag, },})} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" ,width:"100%", whiteSpace:"normal"}}>{job.jobTitle} </p>
                          
                        }
                          {/* <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          } </p>  */}

                        </div>
                         
                       
                        <div className={styles.JobPagecompanyNameLocationWrapper}   >
                          {/* <img className={styles.logo} src={job.Logo} /> */}
                          {/* {console.log("home obj",job)} */}
                          <img className={styles.homePageCompanyLogo} src={ CompanyLogo} />

                          <div class={styles.jobTitleCompanyName}>
                          {!job.Source ?
                            
                            <> <span style={{textDecoration:"none"}} className={styles.companyName}  >{job.companyName} </span><br></br></>
                            :
                            
                            <> <a style={{textDecoration:"none"}} className={`${styles.companyName}`} target="_blank">{job.Source}</a><br></br> </>
                          }
                          </div>
                        </div>

                        <div style={{display:"flex" ,flexDirection:"column",gap:"10px"}}> 
                        
                        {/* <div style={{display:"flex"}}> */}
                        <div style={{display:"flex",alignItems:"center"}}> 
                          < img className={styles.jobLocationImage} src={location} />
                          <span className={styles.jobLocation}>{job.venue} </span>
                        </div>

                        <div style={{display:"flex",marginLeft:"4%",alignItems:"center"}}>
                          <img style={{height:"24px" }} src={graduation} />
                          <div>{job.qualification}</div>
                        </div>
                        {/* </div> */}
                        <div style={{display:"flex"}}>
                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Job Type: </span><span className={styles.skills}>{job.jobtype}</span><br></br>
                        </div>
                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Experience: </span><span className={styles.skills}>{job.experiance} Yrs</span><br></br>
                        </div>
                        </div>
                        <div style={{display:"flex"}}>
                        <span className={styles.jobtypeAndDate}>Drive Date : {new Date(job.driveDate).toLocaleDateString("en-IN")}</span>
                        {/* <span className={styles.jobtypeAndDate}>Drive Time :{job.time && `${((+job.time.split(":")[0] % 12) || 12)}:${job.time.split(":")[1]} ${+job.time.split(":")[0] >= 12 ? "PM" : "AM"}`}</span> */}
                        <span className={styles.jobtypeAndDate}>Drive Time :{job.StartTime}</span>

                        </div>
                        {/* } */}

                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>
                        <div className={styles.applyDrivePackage}>
                          <p className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange} LPA</p>
                          
                          <div ref={alertRef} style={{position:"relative"}}>
        {    
        job.jobSeekerId?.find((jobseeker) => {
          return (
            jobseeker.jobSeekerId == jobSeekerId
          )
        })
          ?

          <button onClick={() => deregister(job._id)}  style={{fontSize:"12px", height:"30px", marginRight:"11px", width:"96px", backgroundColor:"green"}} className={styles.ApplyDriveMobile}  title='Thanks for signing up. Check your email for walk-in drive details.' > Registered <span style={{ fontSize: '12px' }}>&#10004;</span>
            <span className={styles.Loader}>
             {Loader && job._id === clickedJobId ? (
               <TailSpin color="white" height={16} width={16} />
             ) : null}
           </span>
           </button>
          :
(
  EmployeeAuth ? (
    <button style={{marginRight:"11px"}} className={styles.ApplyDriveMobile}  onClick={() => navigate(`/Drivedetails/${btoa(job._id)}?index=${i}`, {state: {selectedTag, },})}>
      <div style={{ display: "flex", width: "81px", alignItems: "center", justifyContent: "center", gap: "6px", paddingRight: "0px" }}>
        View
      </div>
    </button>
  ) : (
    <button style={{width:"84px",marginRight:"11px"}} className={styles.ApplyDriveMobile}  onClick={() => applyforJob(job._id)}>
      <div style={{ display: "flex", width: "81px", alignItems: "center", justifyContent: "center", gap: "6px", paddingRight: "0px" }}>
        Register
        {Loader && job._id === clickedJobId && (
          <TailSpin height={16} width={16} color="white" />
        )}
      </div>
    </button>
  )
)
              }
</div>


                        </div>
                        </div> 

                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {
                            job.jobDescription ? HTMLReactParser(job.jobDescription.slice(0, 100).toString()) : ""
                          }
                          
                          <span 
                          onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Drivedetails/${btoa(job._id)}?index=${i}`, {state: {selectedTag, },})
                          }} 

                          className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>


                      </div>
                      </div>
                    </>
                  )
                })
                : <p style={{ marginLeft: "35%", color: "red" }}>Loading......</p>

            }

          </div>
          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
             
              {/* <option selected={lastIndex === 10} value={10}>10</option>
              <option selected={lastIndex === 25} value={25}>25</option>
              <option selected={lastIndex === 50} value={50}>50</option>
              <option selected={lastIndex === 100} value={100}>100</option> */}
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  drives per page
          </div>
          
          <div className={styles.navigationWrapper} style={{textAlign:"left",marginLeft:"6px"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", marginLeft: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
            </div>
          <div style={{ marginTop: "20px", }}>
            <Footer />
          </div>
        </>
        </>
      }

    </>

  )
}

export default AllWalkinDrive
