import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ duration, name, percent, color }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= percent) {
          clearInterval(interval);
          return percent;
        }
        return prevProgress + 1;
      });
    }, duration / percent);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="progress-bar">
      <div className={`progress`} style={{ width: `${progress}%`, backgroundColor: color?color:"linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5))" }}>
          <div className="skill">
            <div className="skill-name">{name} <span className='text-sm'>{percent}%</span></div>
          </div>
      </div>
    </div>
  );
};

export default ProgressBar;
