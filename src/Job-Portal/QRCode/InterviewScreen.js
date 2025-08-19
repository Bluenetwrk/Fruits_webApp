import React, { useState } from "react";
import styles from "./InterviewScreen.module.css";

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

  const handleEndInterview = () => {
    if (profile) {
      console.log("Submitting profile:", profile);
      alert("Interview Ended & Data Submitted");
      setProfile(null);
      setLoading(false);
    }
  };

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

        {!loading && profile && (
          <div className={styles.profileTableWrapper}>
            <div style={{display:"flex", justifyContent:"center"}}>
              <h2 className={styles.profileHeading}>Jobseeker Profile</h2>
              </div>
            {/* Heading + Image */}
            <div className={styles.profileHeader}>
              <img
                src={profile.image}
                alt="Candidate"
                className={styles.profileImage}
              />
              
            </div>

            {/* Profile Table */}
            <table className={styles.profileTable}>
              <tbody>
                <tr><td>Name</td><td>{profile.name}</td></tr>
                <tr><td>Email Address</td><td>{profile.email}</td></tr>
                <tr><td>City</td><td>{profile.city}</td></tr>
                <tr><td>Phone Number</td><td>{profile.phone}</td></tr>
                <tr><td>Qualification</td><td>{profile.qualification}</td></tr>
                <tr><td>Skills</td><td>{profile.skills}</td></tr>
                <tr><td>Notice Period</td><td>{profile.noticePeriod}</td></tr>
                <tr><td>Experience</td><td>{profile.experience}</td></tr>
                <tr><td>Current CTC</td><td>{profile.currentCTC}</td></tr>
                <tr><td>Expected Salary</td><td>{profile.expectedSalary}</td></tr>
                <tr><td>Previous Company</td><td>{profile.prevCompany}</td></tr>
                <tr><td>Present Company</td><td>{profile.presentCompany}</td></tr>
                <tr><td>Aadhaar</td><td>{profile.aadhaar}</td></tr>
                <tr><td>PAN</td><td>{profile.pan}</td></tr>
                <tr><td>Account Status</td><td>{profile.accountStatus}</td></tr>
                <tr><td>HR Feedback</td><td>{profile.feedback}</td></tr>
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
          onClick={handleScan}
          disabled={loading || profile}
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
