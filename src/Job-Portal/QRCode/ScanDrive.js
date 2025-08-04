import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyDrives } from "./dummyDrives";
import axios from "axios";
import styles from "../Jobs/Allobs.module.css"

const ScanDrive = () => {

  const { driveId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);
  let studId = JSON.parse(localStorage.getItem("StudId"))


  useEffect(() => {
    const fetchProfile = async () => {
      let userid = JSON.parse(localStorage.getItem("StudId"))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    try {
        const res = await axios.get(`/StudentProfile/getProfile/${studId}`, {headers})
        const result = res.data.result;
        // console.log(result)
        setProfileData([result]);
        // console.log(profileData) // Save profile to state
      } catch (err) {
        alert("Something went wrong while fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [studId]);

const[allWalkinDrive, setAllWalkinDrive]=useState([])
  async function getjobs() {

    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/walkinRoute/getHomewalkins",{headers})
      .then((res) => {
        let result = (res.data)
        // console.log("result - >",result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
        setAllWalkinDrive(sortedate)
        // console.log("allWalkinDrive",allWalkinDrive)
      }).catch((err) => {
        console.log(err)
        alert("some thing went wrong")
      })
  }

  useEffect(()=>{
    getjobs()
    // console.log("companyName",allWalkinDrive)
  },[])


  useEffect(() => {
    if(allWalkinDrive.length>0){
    if (profileData.length === 0) return;

    const StudentAuth = localStorage.getItem("StudLog");

    if (!StudentAuth) {
      alert("Please log in as Jobseeker.");
      navigate("/");
      return;
    }

    const generateUniqueCode = (driveId) => {
      const drive = allWalkinDrive.find((drive) => drive._id === driveId);
      // console.log("drive", drive)
      // console.log("profile", profileData[0])
      if (!drive?.companyName) {
        alert("Please Scan the QR code.");
        navigate("/");
        return null;
      }

      const companyCode = drive?.companyName?.substring(0, 2).toUpperCase();
      // console.log("companyName",companyName)
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomPart = "";
      for (let i = 0; i < 3; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return `${companyCode}${randomPart}`;
    };

    const attendanceData = JSON.parse(localStorage.getItem("attendance")) || [];
    const filteredData = attendanceData.filter(
      (entry) => !(entry.userId === studId && entry.driveId === driveId)
    );

    const newCode = generateUniqueCode(driveId);
    if (!newCode) return;

    const updatedData = [
      ...filteredData,
      {
        userId: studId,
        driveId,
        code: newCode,
        timestamp: new Date().toISOString(),
      },
    ];

    localStorage.setItem("attendance", JSON.stringify(updatedData));
    setCode(newCode);
    setLoading(false);
  }
  }, [profileData, driveId, studId, allWalkinDrive]);



  return (
    <div style={{ padding: "2rem", }}>
      <h2>
        {/* QR Scanned for Drive: <span style={{ color: "#0077cc" }}>{driveId}</span> */}
        Token Allotment Display 
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <h3>Your Unique Attendance Code:</h3> */}
          {/* {console.log("kkkk",profileData)} */}
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>Welcome {profileData[0]?.name} !</div>
          <div style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}>Your token is </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>{code}</div>
          <div style={{ fontSize: "1rem", fontWeight: "bold", color: "#black" }}>Please Proceed to waiting area.<br></br>Watch the TV for your turn.</div>
          <button className={styles.QRHomeBtn} style={{ marginTop: "1.5rem" }} onClick={() => navigate("/")}>
            Go to Home
          </button>
        </>
      )}
    </div>
  );
};

export default ScanDrive;
