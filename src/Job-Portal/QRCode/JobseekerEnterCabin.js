
// JobseekerEnterCabin.jsx
import React, { useEffect } from "react";
import { getProfileByUserId, setCurrentInCabin, Databaseprofile } from "./mockdatabase";
import { useNavigate, useParams } from "react-router-dom";


export default function JobseekerEnterCabin() {
    const StudentAuth = localStorage.getItem("StudLog");

   const navigate = useNavigate();
    const { driveId } = useParams();
   

  useEffect(() => {
    const userId = localStorage.getItem("userId"); 
    const profile = getProfileByUserId(userId);

    if (!StudentAuth) {
        alert("Please log in as Jobseeker.");
        navigate("/");
        return;
      }

    if (profile) {
      setCurrentInCabin(profile); 
    //   alert("You have entered the cabin. HR has beenl notified.");
    } else {
    //   alert("No profile found. Please log in again.");
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to the Interview Cabin</h2>
      <p>Your presence has been marked. Good Luck for the interview.</p>
    </div>
  );
}
