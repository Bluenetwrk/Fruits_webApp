import React, { useState } from 'react';
import styles from "./Allobs.module.css";
import axios from 'axios';

const PostFraudForm = () => {
  const [misuseType, setMisuseType] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFileChange = (e) => {
    setEvidence(e.target.files[0]);
  };

      const [successMessage, setSuccessMessage] = useState("")
  
  async function handleSubmit(e) {
    e.preventDefault(); 
    if (!description || !misuseType) {
      setSuccessMessage("Alert!... Misuse Type and Misuse Description must be filled")
      window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
      return;
    }

    let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    const issues=description     
    await axios.post("/QuestionRoute/postQuestion", {
        misuseType, issues
    }, { headers })
        .then((res) => {
            let result = (res.data)
            console.log(result)
            if (result == "success") {
                setMisuseType('');
                setDescription('');
                // setEvidence(null);
                // setEmail('');           
                setSuccessMessage("Success! fraud report successfully posted")
            }
            else if (result == "field are missing") {
                setSuccessMessage("Alert!... Misuse Type and Misuse Description must be filled")
            }
            else
                {
                setSuccessMessage("something went wrong, Could not save your Jobs post")
            }
        }).catch((err) => {
            alert("server issue occured", err)
        })
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

  const handleCancel = () => {
    setMisuseType('');
    setDescription('');
    setEvidence(null);
    setEmail('');
    setShowSuccessMessage(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Report Misuse of ITWalkin</h2>
      
      {/* {showSuccessMessage && (
        <div className={styles.successMessage}>
          ✅ Successfully submitted!
        </div>
      )} */}
      {successMessage=="Success! fraud report successfully posted"?
           <p style={{color:"green"}}>{successMessage}</p>:
           <p style={{color:"red"}}>{successMessage}</p>
      }

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
           Select Type of Misuse:
          <select
            value={misuseType}
            onChange={(e) => setMisuseType(e.target.value)}
            // required
            className={styles.select}
          >
            <option value="">-- Select --</option>
            <option value="Fake job postings">Fake job postings</option>
            <option value="Impersonation">Impersonation</option>
            <option value="Scam">Scam</option>
          </select>
        </label>

        <label className={styles.label}>
           Describe the Issue (Required)
          <textarea
          style={{fontFamily:"serif"}}
            placeholder="Provide details of the misuse..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // required
            className={styles.textarea}
          />
        </label>

        {/* <label className={styles.label}>
          📎 Upload Evidence (Optional)
          <input type="file" onChange={handleFileChange} />
        </label> */}

        {/* <label className={styles.label}>
           Your Contact Email (Optional)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={styles.input}
          />
        </label> */}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>✅ Submit Report</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PostFraudForm;