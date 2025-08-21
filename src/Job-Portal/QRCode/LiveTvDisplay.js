import React, { useEffect, useState } from "react";
import styles from "./LiveTvDisplay.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const LiveTvDisplay = () => {
  const [allCandidates, setAllCandidates] =useState([]);
  const[jobSeekerId, setJobSeekerIds]=useState([]);
let params = useParams();

  async function postJob() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get(`/walkinRoute/walkindetails/${atob(params.id)}`,{headers}) 
        .then((res) => {
            let result = (res.data)
            console.log(result)
            // if (result) {
                
            //   setSuccessMessage("success")
            // }
            // else if (result == "field are missing") {
            //     setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
            // }
            // // else if (result ==="server issue")
            // else
            //     {
            //     setSuccessMessage("something went wrong, Could not save your Jobs post")
            // }
        }).catch((err) => {
            alert("server issue occured", err)
        })

}

useEffect(()=>{
    postJob()
},[])

 

  // Fixed Cabin Assignment (cabin 1 to 5, looped)
  const allCabinAssignments = allCandidates.map((c, i) => ({
    cabinNo: `Cabin ${(i % 5) + 1}`,
    token: c.token,
    name: c.name,
  }));

  const [waitingPage, setWaitingPage] = useState(0);
  const [cabinPage, setCabinPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingPage((prev) => (prev + 1) % Math.ceil(allCandidates.length / rowsPerPage));
      setCabinPage((prev) => (prev + 1) % Math.ceil(allCabinAssignments.length / rowsPerPage));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getWaitingSlice = () => {
    const start = waitingPage * rowsPerPage;
    return allCandidates.slice(start, start + rowsPerPage);
  };

  const getCabinSlice = () => {
    const start = cabinPage * rowsPerPage;
    return allCabinAssignments.slice(start, start + rowsPerPage);
  };

  return (
    <div className={styles.displayContainer}>
      {/* Waiting Area */}
      <div className={`${styles.panel} ${styles.waitingPanel}`}>
        <h2 className={styles.title}>Waiting Area</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            {getWaitingSlice().map((item, index) => (
              <tr key={item.token}>
                <td>{waitingPage * rowsPerPage + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HR Cabin Area */}
      <div className={`${styles.panel} ${styles.cabinPanel}`}>
        <h2 className={styles.title}>HR Cabins</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cabin No</th>
              <th>Token</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {getCabinSlice().map((item, index) => (
              <tr key={item.token}>
                <td>{item.cabinNo}</td>
                <td>{item.token}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveTvDisplay;
