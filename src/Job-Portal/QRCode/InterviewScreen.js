import React, { useEffect, useState } from "react";
import styles from "./InterviewScreen.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const InterviewScreen = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [comments, setComments] = useState("");

  const handleScan = async () => {
    setLoading(true);
    setProfile(null);

    // simulate API fetch
    setTimeout(() => {
      setProfile({
        name: "Not Updated",
        email: "Not Updated",
        city: "Not Updated",
        phone: "Not Updated",
        qualification: "Not Updated",
        skills: "Not Updated",
        noticePeriod: "Not Updated",
        experience: "Not Updated",
        currentCTC: "Not Updated",
        expectedSalary: "Not Updated",
        prevCompany: "No Feedback",
        presentCompany: "No Feedback",
        aadhaar: "Not Updated",
        pan: "Not Updated",
        accountStatus: "Not Updated",
        feedback: "No Feedback",
        image:
          "https://via.placeholder.com/80", // Replace with dynamic image if available
      });
      setLoading(false);
    }, 2000);
  };

  const [interviewEnded, setInterviewEnded] = useState(false);
  const [interviewstated, setInterviewstarted] = useState(false);
  
  const handleEndInterview = () => {
  if (profileData.length > 0) {
    console.log("Submitting profile:", profileData);
    sendMessage();
    
  }
};

  const [jobseeker, setJobseeker] = useState(null);
  const [pageLoader, setPageLoader]=useState(false);
  const[profileData,setProfileData]=useState([])
   let params = useParams();
  async function getJobseekerId() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    try {
      const res = await axios.get(`/walkinRoute/walkindetails/${atob(params.id)}`, { headers });
      const result = res.data;
      console.log(result);
  
      if (result) {
        const list = result.HRCabin.map(item => ({
          jobSeekerId: item.jobSeekerId[0]?.jobSeekerId,
          tokenNo: item.tokenNo[0],
          createdDateTime: new Date(item.createdDateTime),
          updatedDateTime: new Date(item.updatedDateTime),
        }));
  
        if (list.length > 0) {
          // Find the latest record by createdDateTime
          const latestRecord = list.reduce((latest, current) =>
            current.createdDateTime > latest.createdDateTime ? current : latest
          );
  
          setJobseeker(latestRecord); // store only the latest object
        }
      } else if (result === "field are missing") {
        console.log("failed to fetch data");
      }
    } catch (err) {
      alert("server issue occurred");
      console.error(err);
    }
  }
  
  
  
  useEffect(()=>{
      getJobseekerId()
  },[])

  const [noData, setNoData] = useState(false);
    async function getProfile() {
      setInterviewstarted(true);
  setInterviewEnded(false);
      const studId=jobseeker?.jobSeekerId;
      if (!studId) {
        setNoData(true); 
        setInterviewstarted(false)  // 👈 no studId = no data
        return;
      }
      
        setLoading(true)
        await axios.get(`/StudentProfile/viewProfile/${studId}`)
            .then((res) => {
                let result = res.data.result
                console.log("profile",result)
                
                setProfileData([result])
        setLoading(false)

            }).catch((err) => {
                alert("some thing went wrong")
            })
    }
  

  useEffect(()=>{
  console.log(profileData)
 
  },[profileData])
  
 
  async function sendMessage() {
    const message=comments;
    const id=jobseeker?.jobSeekerId;
    await axios.put(`/StudentProfile/sendMessage/${id}`, { message })
      .then((res) => {
        if (res.data) {
          setProfileData([]);
    setProfile(null);
    setLoading(false);
    setInterviewEnded(true); 
    setInterviewstarted(false) // mark as ended
    // setComments("");
          alert("interview completed Successfully and feedback has been submitted");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("something went wrong");
        console.error(err);
      });
  }
  




  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.leftBox}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading..</p>
          </div>
        )}

{!loading && noData && (
    <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
      No Jobseeker has Scanned the QR Code
    </div>
  )}

        {!loading && profileData.length>0 &&  !interviewEnded &&(
          <div className={styles.profileTableWrapper}>
            <div style={{display:"flex", justifyContent:"center"}}>
              <h2 className={styles.profileHeading}>Jobseeker Profile</h2>
              </div>
            {/* Heading + Image */}
            <div className={styles.profileHeader}>
              <img
                // src={}
                alt="Candidate"
                className={styles.profileImage}
              />
              
            </div>

            {/* Profile Table */}
            <table className={styles.profileTable}>
              <tbody>
                <tr><td>Name</td><td>{profileData[0]?.name?profileData[0]?.name:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Email Address</td><td>{profileData[0]?.email?profileData[0]?.email:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>City</td><td>{profileData[0]?.city?profileData[0]?.city.value:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Phone Number</td><td>{profileData[0]?.phoneNumber?profileData[0]?.phoneNumber:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Qualification</td><td>{profileData[0]?.Qualification?profileData[0]?.Qualification:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Skills</td><td>{profileData[0]?.Skills?profileData[0]?.Skills:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Notice Period</td><td>{profileData[0]?.NoticePeriod?profileData[0]?.NoticePeriod:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Experience</td><td>{profileData[0]?.Experiance?profileData[0]?.Experiance:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Current CTC</td><td>{profileData[0]?.currentCTC?profileData[0]?.currentCTC:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                <tr><td>Expected Salary</td><td>{profileData[0]?.ExpectedSalary?profileData[0]?.ExpectedSalary:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                {/* <tr><td>Previous Company</td><td>{profile.prevCompany}</td></tr>
                <tr><td>Present Company</td><td>{profile.presentCompany}</td></tr> */}
                <tr><td>Aadhaar</td><td>{profileData[0]?.Aadhar?profileData[0]?.Aadhar:<p style={{color:"red"}}>Not updated</p>}</td></tr>
                {/* <tr><td>PAN</td><td>{profile.pan}</td></tr> */}
                {/* <tr><td>Account Status</td><td>{profileData[0]?.accountStatus?profileData[0]?.accountStatus:<p style={{color:"red"}}>Not updated</p>}</td></tr> */}
                <tr><td>HR Feedback</td><td>{profileData[0]?.message?profileData[0]?.message:<p style={{color:"red"}}>No Feedback</p>}</td></tr>
                <tr><td>Comments</td><td>
                   <textarea
                     value={comments}
                     onChange={(e) => setComments(e.target.value)}
                     className={styles.commentBox}
                     placeholder="Write your feedback here..."
                   />
               </td>
               </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className={styles.rightBox}>
        <button
          className={styles.scanBtn}
          onClick={getProfile}
          disabled={interviewstated}
        >
          {profile ? "Scan Resume (disabled)" : "Scan Progress"}
        </button>

        <button className={styles.endBtn} onClick={handleEndInterview}>
          End Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewScreen;
