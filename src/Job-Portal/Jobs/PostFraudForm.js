import React, { useState } from 'react';
import styles from "./PostFraudForm.module.css";

const PostFraudForm = () => {
  const [misuseType, setMisuseType] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [issues, setIssues] = useState(['']);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption || issues.length === 0 || issues.some(issue => issue.trim() === '')) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = {
      misuseType,
      issueOption: selectedOption,
      issues
    };

    console.log("Submitted Data:", formData);

    // Reset
    setMisuseType('');
    setSelectedOption('');
    setIssues(['']);

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setMisuseType('');
    setSelectedOption('');
    setIssues(['']);
    setShowSuccessMessage(false);
  };

  const handleIssueChange = (index, value) => {
    const updatedIssues = [...issues];
    updatedIssues[index] = value;
    setIssues(updatedIssues);
  };

  const addIssue = () => {
    if (issues.length < 5) {
      setIssues([...issues, '']);
    }
  };

  const removeIssue = (index) => {
    const updatedIssues = issues.filter((_, i) => i !== index);
    setIssues(updatedIssues);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Report Misuse of ITWalkin</h2>

      {showSuccessMessage && (
        <div className={styles.successMessage}>✅ Successfully submitted!</div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Select Type of Misuse:
          <select
            value={misuseType}
            onChange={(e) => setMisuseType(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">-- Select --</option>
            <option value="Fake job postings">Fake job postings</option>
            <option value="Impersonation">Impersonation</option>
            <option value="Scam">Scam</option>
          </select>
        </label>

        <fieldset className={styles.label}>
          <legend>Describe the Issue (Required)</legend>

          <div>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="issue"
                value="1–5"
                checked={selectedOption === "1–5"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setIssues(['']);
                }}
                required
              /> 1–5
            </label>
          </div>

          <div>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="issue"
                value="5–10"
                checked={selectedOption === "5–10"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setIssues(['']);
                }}
              /> 5–10
            </label>
          </div>

          <div>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="issue"
                value="Other"
                checked={selectedOption === "Other"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setIssues(['']);
                }}
              /> Other
            </label>
          </div>
        </fieldset>

        {/* Dynamic Issue Fields */}
        {selectedOption && (
          <div className={styles.issueContainer}>
            {issues.map((issue, index) => (
              <div key={index} className={styles.issueRow}>
                <textarea
                  placeholder={`Enter details (Issue ${index + 1})`}
                  value={issue}
                  onChange={(e) => handleIssueChange(index, e.target.value)}
                  className={styles.textarea}
                  required
                />
                {issues.length > 1 && (
                  <button
                   style={{marginTop:"12px"}}
                    type="button"
                    onClick={() => removeIssue(index)}
                    className={styles.removeButton}
                  >
                   <div style={{display:"flex"}}>
                    <div>❌</div> 
                    <div>Remove</div> 
                   </div>
                  </button>
                )}
              </div>
            ))}
            {issues.length < 5 && (
              <button
                type="button"
                onClick={addIssue}
                className={styles.addButton}
              >
                ➕ Add Issue
              </button>
            )}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>✅ Submit Report</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PostFraudForm;
