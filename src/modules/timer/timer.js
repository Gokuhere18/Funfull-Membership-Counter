import React from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./timer.css";

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}s</div>
    </div>
  );
};

function MyTimer() {
  const [timer, setTimer] = React.useState(0);

  // Calculate viewport width outside JSX
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  return (
    <div className="App">
      <div className="timer-wrapper">
        {/* Use the calculated viewportWidth */}
        <CountdownCircleTimer
          key={timer}
          isPlaying
          duration={60}
          colors={['#9000ff', '#0066FF', '#9000ff', '#F7B801','#9000ff', '#0066FF', '#9000ff']}
          colorsTime={[50, 40, 30, 20, 10, 5, 0]}
          size={viewportWidth > 767 ? 100 : 70}
          isSmoothColorTransition={true}
          onComplete={() => {
            return { shouldRepeat: true } 
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default MyTimer;
