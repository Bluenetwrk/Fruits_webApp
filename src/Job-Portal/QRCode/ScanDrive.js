// logincheck-here
// naviagte to be implemented if possible
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyDrives } from "./dummyDrives";
import axios from "axios";

// Function to generate a 3-character alphanumeric code


const ScanDrive = () => {
    
  const { driveId } = useParams(); 
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);


  let empId = JSON.parse(localStorage.getItem("EmpIdG"))
const [profileData, setProfileData] = useState([])
    async function getProfile() {
        const headers = { authorization: 'BlueItImpulseWalkinIn'};
       
        await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
            .then((res) => {
                let result = res.data.result
                setProfileData([result])


            }).catch((err) => {
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

  useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("user"));

  let StudentAuth = localStorage.getItem("StudLog")
  let EmployeeAuth = localStorage.getItem("EmpLog")

  if (!StudentAuth && !EmployeeAuth) {
    alert("Please log in first.");
    navigate("/");
    return;
  }

  const generateUniqueCode = (driveId) => {
    const drive = dummyDrives.find(d => d.id === driveId);
    if (!drive?.companyName) {
        alert("Please Scan the QR code.");
        navigate("/"); 
        return; 
      }
      
      const companyCode = drive.companyName.substring(0, 2).toUpperCase();
  
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 3; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return `${companyCode}${randomPart}`; 
  };

  const attendanceData = JSON.parse(localStorage.getItem("attendance")) || [];

  const filteredData = attendanceData.filter(
    (entry) => !(entry.userId === empId && entry.driveId === driveId)
  );

//   if (existingEntry) {
//     setCode(existingEntry.code);
//     setLoading(false);
//   } else {
    const newCode = generateUniqueCode(driveId);

    const updatedData = [...filteredData, {
      userId: empId,
      driveId: driveId,
      code: newCode,
      timestamp: new Date().toISOString()
    }];

    localStorage.setItem("attendance", JSON.stringify(updatedData));
    setCode(newCode);
    setLoading(false);
//   }
}, [driveId, navigate]);


  return (
    <div style={{ padding: "2rem" }}>
      <h2>QR Scanned for Drive: <span style={{ color: "#0077cc" }}>{driveId}</span></h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Your Unique Attendance Code:</h3>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>{code}</div>
          <button style={{ marginTop: "1.5rem" }} onClick={() => navigate("/profile")}>
            Go to Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ScanDrive;
