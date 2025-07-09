import React, { useEffect, useState } from "react";
import "./LiveTvDisplay.css";
import drivedesk from "../img/drivedesk.png";
import { useNavigate } from "react-router-dom";

const TOTAL_CABINS = 5;
const TOTAL_TOKENS = 20;
const COMPANY_CODE = "AB";
const UPDATE_INTERVAL = 3000;

const generateAlphaNumeric = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateTokens = () => {
  const tokens = new Set();
  while (tokens.size < TOTAL_TOKENS) {
    tokens.add(COMPANY_CODE + generateAlphaNumeric());
  }
  return Array.from(tokens);
};

const LiveTvDisplay = () => {
  const [cabinQueues, setCabinQueues] = useState([]);
  const [displayTokens, setDisplayTokens] = useState([]);

  // Step 1: Generate tokens and assign to queues
  useEffect(() => {
    const tokens = generateTokens();
    const queues = Array.from({ length: TOTAL_CABINS }, () => []);
    tokens.forEach((token, index) => {
      queues[index % TOTAL_CABINS].push(token);
    });
    setCabinQueues(queues);

    const initialDisplay = queues.map((queue, i) => ({
      cabin: `Cabin-${101 + i}`,
      token: queue[0],
      index: 0,
    }));
    setDisplayTokens(initialDisplay);
  }, []);

  // Step 2: Rotate tokens after cabinQueues is ready
  useEffect(() => {
    if (cabinQueues.length === 0) return;

    const interval = setInterval(() => {
      setDisplayTokens((prevDisplay) =>
        prevDisplay.map(({ cabin, index }, i) => {
          const queue = cabinQueues[i];
          if (!queue) return { cabin, token: "N/A", index: 0 }; // safety check

          const nextIndex = (index + 1) % queue.length;
          return {
            cabin,
            token: queue[nextIndex],
            index: nextIndex,
          };
        })
      );
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [cabinQueues]);
  const navigate = useNavigate()
  return (
    <div className="live-display">
      <button className="jobdetailBackBtnMobile"
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/'); 
                  }
             }}>
                 Back
          </button>
      <div className="header">
        <h1>LIVE TV DISPLAY</h1>
        <div className="date">{new Date().toLocaleString()}</div>
      </div>

      <div className="screen">
        <div className="video-placeholder">
          <img src={drivedesk} alt="Reception Desk" className="reception-image" />
        </div>

        <div className="cabin-info">
          <div className="row heading">
            <span className="cabin">Cabin Number</span>
            <span className="token">Token Number</span>
          </div>
          {displayTokens.map(({ cabin, token }, index) => (
            <div className="row" key={index}>
              <span className="cabin">{cabin}</span>
              <span className="token">{token}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <p>Live TV Display · Please proceed to your assigned cabin</p>
      </div>
    </div>
  );
};

export default LiveTvDisplay;
