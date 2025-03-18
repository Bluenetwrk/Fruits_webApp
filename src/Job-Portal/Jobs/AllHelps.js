import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import Footer from "../Footer/Footer";
import useScreenSize from "../SizeHook";

function AllHelps() {
  const [Contact, setContact] = useState([]);
  const screenSize = useScreenSize();

  async function getContact() {
    await axios.get("/admin/getWebsiteDetails").then((res) => {
      let result = res.data.result;
      setContact(result[0].Contact);
    });
  }

  useEffect(() => {
    getContact();
  }, []);

  const helpData = [
    { id: 1, question: "How to Register as a Employer?", view: "View" },
    { id: 2, question: "How to Register as a JobSeeker?", view: "View" },
    { id: 3, question: "How to Post a job as employer ", view: "View" },
  ];

  return (
    <>
      <div style={{ marginLeft: "10px" }}>
        <h2 style={{ marginLeft: "1px", fontWeight: "800", marginTop: "5px" }}>
          ITWalkin Help/Support
        </h2>
        <div style={{ width: "93%" }}>{HTMLReactParser(Contact.toString())}</div>
      </div>

      {/* Table View for Screens Larger than 768px */}
      {screenSize.width > 768 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Help Questions</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {helpData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.question}</td>
                <td style={{ width: "20%" }}>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Card View for Screens 768px or Smaller
        <div className="card-container">
          {helpData.map((item, index) => (
            <div className="help-card" key={item.id}>
              <h4>{index + 1}. {item.question}</h4>
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          .container {
            max-width: 100%;
            margin: auto;
            padding: 20px;
          }
          table {
            width: 45%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .view-btn {
            padding: 5px 10px;
            background-color: blue;
            color: white;
            border: none;
            cursor: pointer;
          }

          /* Card styles for mobile view */
          .card-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
          }
          .help-card {
            background: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 11px;
    width: 87%;
    margin-left: 11px;
          }
        `}
      </style>

      {screenSize.width > 750 ? "" : <Footer />}
    </>
  );
}

export default AllHelps;
