import React, { useEffect, useState } from 'react';
import './templateOne.css';
import { generatePDF } from './generatePDF';
import axios from 'axios';

const TemplateOne = () => {

 const [profileData, setProfileData] = useState([]);
  let studId = JSON.parse(localStorage.getItem("StudId"))

  useEffect(() => {
    const fetchProfile = async () => {
      let userid = JSON.parse(localStorage.getItem("StudId"))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    try {
        const res = await axios.get(`/StudentProfile/getProfile/${studId}`, {headers})
        const result = res.data.result;
        console.log(result)
        setProfileData([result]);
        console.log("mbb",profileData) // Save profile to state
      } catch (err) {
        alert("Something went wrong while fetching profile");
        // setLoading(false);
      }
    };

    fetchProfile();
  }, [studId]);



  const data = {
   
    summary:
      'Experienced QA Team Lead with proven track record of building Automation Frameworks for Web, App and REST API from scratch, Mentoring, Grooming, Guiding and getting Tasks Accomplished by the Team on or before given timeline.',
    address:
      'Flat No. 305, Lakeview Residency, 3rd Cross, HSR Layout, Bangalore, Karnataka - 560102',
    totalExperience: '7 years 6 months',
    certification: 'ISTQB Certified Test Engineer',
    experience: [
      {
        company: 'InvariaTech',
        location: 'Bangalore',
        title: 'QA Lead',
        date: 'Dec 2016 - PRESENT',
        details: [
          'QA Lead for App(Android/IOS), Web, API and Hardware Testing.',
          'Designing and Implementing Automation Framework, Interacting with ARM processor using TERMIOS.',
          'Involved in Requirement analysis, Creation of Test Plan, Test Strategy.',
          'Travelled on-site(USA).',
        ],
      },
      {
        company: 'Rodmart',
        location: 'Bangalore',
        title: 'Senior QA Engineer',
        date: 'Aug 2015 - Oct 2016',
        details: [
          'Worked on Web and REST API Test Case automation verifying against Results present in MongoDB.',
          'Performance testing and JVM profiling.',
          'Travelled on-site(Singapore).',
        ],
      },
      {
        company: 'Energyquote',
        location: 'Bangalore',
        title: 'QA Engineer',
        date: 'Nov 2012 - May 2015',
        details: [
          'Worked on Framework creation and Automation Scripting of Web applications and Load testing using JMeter.',
          'Writing, Reviewing and Executing Test cases.',
          'Mentoring Interns.',
        ],
      },
      {
        company: 'Kilmist InfoTech',
        location: 'Bangalore',
        title: 'Trainee Test Engineer',
        date: 'Nov 2011 - Oct 2012',
        details: [
          'Testing Web application.',
          'Writing and reviewing test cases for the automation Framework.',
          'Writing Automation scripts for the websites.',
        ],
      },
    ],
    technicalSkills: [
      {
        title: 'Automation Tool',
        skills: ['Selenium', 'Appium', 'REST-Assured', 'Test Partner'],
      },
      {
        title: 'Unit Test Framework',
        skills: ['TestNG', 'Junit'],
      },
      {
        title: 'Design Pattern',
        skills: ['Page Object Model'],
      },
      {
        title: 'Performance Test Tools',
        skills: ['JMeter', 'JProfiler'],
      },
      {
        title: 'Frameworks Implemented',
        skills: ['Data Driven', 'Module Based', 'Hybrid'],
      },
      {
        title: 'REST API Test Tools',
        skills: ['Postman', 'REST Client'],
      },
      {
        title: 'Languages',
        skills: ['Java', 'Python', 'VBA', 'C++'],
      },
    ],
  };

  return (
    <>
      <div className="resume-container">
        <div id="template-one" className="template-one">
          {/* Header */}
          <div className="resume-header">
            <div className="header-left">
              <h1 className="resume-name">{profileData[0]===undefined?"Loading...":profileData[0]?.name}</h1>
              <p className="summary">{data.summary}</p>
            </div>
            <div className="header-right">
              <p>{data.address}</p>
              <p style={{color:"#007bff"}}>{profileData[0]===undefined?"Loading...":profileData[0]?.email}</p>
              <p>{profileData[0]===undefined?"Loading...":profileData[0]?.phoneNumber}</p>
            </div>
          </div>

          <div className="resume-body">
            <div className="left-section">
              <h2  style={{color:"#007bff"}} className="section-title">EXPERIENCE</h2>
              {data.experience.map((exp, index) => (
                <div className="experience" key={index}>
                  <h3>
                    {exp.company}, {exp.location} — <strong>{exp.title}</strong>
                  </h3>
                  <p className="date">{exp.date}</p>
                  <ul>
                    {exp.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="right-section">
              <div className="certification">
                <h4 style={{color:"#007bff", fontSize:"14px", fontWeight:"800"}}>Certification</h4>
                <p>{data.certification}</p>
              </div>

              <div className="total-exp">
                <h4 style={{color:"#007bff", fontSize:"14px", fontWeight:"800"}}>Total Experience</h4>
                {console.log("ff",profileData[0])}
                <p>{profileData[0]===undefined? `Loading...`: `${profileData[0]?.Experiance}Years`}</p>
              </div>

             
              <div className="skills">
                <h4 style={{color:"#007bff", fontSize:"14px", fontWeight:"800"}}>CORE TECHNICAL SKILLS</h4>
                {data.technicalSkills.map((group, i) => (
                  <div className="skill-section" key={i}>
                    <h5>{group.title}</h5>
                    <ul>
                      {group.skills.map((skill, j) => (
                        <li key={j}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="download-button"
        onClick={() => generatePDF('template-one', 'template-one-resume.pdf')}
      >
        Download Template 1 PDF
      </button>
    </>
  );
};

export default TemplateOne;
