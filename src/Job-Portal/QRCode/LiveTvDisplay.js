import React, { useEffect, useState } from "react";
import styles from "./LiveTvDisplay.module.css";

const LiveTvDisplay = () => {
  // Fixed 20 candidates
  const allCandidates = [
    { id: 1, name: "Anjali Sharma", token: "TKN001" },
    { id: 2, name: "Rahul Mehta", token: "TKN002" },
    { id: 3, name: "Nikita Kumari", token: "TKN003" },
    { id: 4, name: "Arjun Verma", token: "TKN004" },
    { id: 5, name: "Simran Kaur", token: "TKN005" },
    { id: 6, name: "Ravi Shankar", token: "TKN006" },
    { id: 7, name: "Kunal Yadav", token: "TKN007" },
    { id: 8, name: "Pooja Singh", token: "TKN008" },
    { id: 9, name: "Vikram Chauhan", token: "TKN009" },
    { id: 10, name: "Meena Patel", token: "TKN010" },
    { id: 11, name: "Dev Mishra", token: "TKN011" },
    { id: 12, name: "Sana Sheikh", token: "TKN012" },
    { id: 13, name: "Yash Jain", token: "TKN013" },
    { id: 14, name: "Reema Rani", token: "TKN014" },
    { id: 15, name: "Gaurav Das", token: "TKN015" },
    { id: 16, name: "Ishita Roy", token: "TKN016" },
    { id: 17, name: "Aditya Rao", token: "TKN017" },
    { id: 18, name: "Kritika Joshi", token: "TKN018" },
    { id: 19, name: "Mohit Singh", token: "TKN019" },
    { id: 20, name: "Sneha Dubey", token: "TKN020" },
  ];

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
