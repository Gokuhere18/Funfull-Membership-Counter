import React, { useState, useEffect } from 'react';
import logo from '../../download.svg';
import './passCounter.css';
import MyTimer from '../timer/timer';
import Clock from '../clock/Clock'; // Import the Clock component

function PassCounter() {
  const [data, setData] = useState(null);
  const [yesterdayCount, setYesterdayCountData] = useState(null);
  const [todayCount, setTodayCountData] = useState(null);
  const [previousCount, setPreviousCount] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);
  const [displayType, setDisplayType] = useState('summerPass');
  const [totalRedeemedCount, setTotalRedeemedCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://dashboard-preprod.funfull.com/current_pass_count';
  
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData ? jsonData[0].total_purchased_pass.toLocaleString('en-IN') : 0);
        setYesterdayCountData(jsonData ? jsonData[0].yesterday_total_count.toLocaleString('en-IN') : 0);
        setTodayCountData(jsonData ? jsonData[0].today_count.toLocaleString('en-IN') : 0);
        setTotalRedeemedCount(jsonData ? jsonData[0].total_redeem.toLocaleString('en-IN') : 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      const previousCountDigits = previousCount ? previousCount.toString().split('') : [];
      const currentCountDigits = data.toString().split('');

      previousCountDigits.forEach((digit, index) => {
        const previousDigitElement = document.getElementById(`digit-${index}`);
        const currentDigit = currentCountDigits[index];

        if (previousDigitElement && currentDigit && digit !== currentDigit) {
          previousDigitElement.classList.add('changing');
          setTimeout(() => {
            previousDigitElement.innerText = currentDigit;
            previousDigitElement.classList.remove('changing');
          }, 500);
        }
      });

      setPreviousCount(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setCurrentCount(data);
      setPreviousCount(data);
    }
  }, [data]);

  const handleNext = () => {
    if (displayType === 'summerPass') {
      setDisplayType('today');
    } else if (displayType === 'today') {
      setDisplayType('yesterday');
    } else if (displayType === 'yesterday') {
      setDisplayType('totalRedeemed');
    } else {
      setDisplayType('summerPass');
    }
  };

  const handlePrev = () => {
    if (displayType === 'summerPass') {
      setDisplayType('yesterday');
    } else if (displayType === 'yesterday') {
      setDisplayType('today');
    } else if (displayType === 'today') {
      setDisplayType('totalRedeemed');
    } else {
      setDisplayType('summerPass');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <img src={logo} className="App-logo" alt="logo" />
        <div className='Timer'>
          <MyTimer remainingTime={60}/>
        </div>
        <div className="counts-container">
          <div className="arrow" onClick={handlePrev}>&larr;</div>
          <div className='count' id="count">
            {displayType === 'summerPass' && (
              <>
                <div className="count-value">{currentCount}</div>
                <div>SummerPass Purchased</div>
              </>
            )}
            {displayType === 'today' && (
              <>
                <div className="count-value">{todayCount}</div>
                <div>Today's count</div>
              </>
            )}
            {displayType === 'yesterday' && (
              <>
                <div className="count-value">{yesterdayCount}</div>
                <div>Yesterday's count</div>
              </>
            )}
            {displayType === 'totalRedeemed' && (
              <>
                <div className="count-value">{totalRedeemedCount}</div>
                <div>Total Redeemed</div>
              </>
            )}
          </div>
          <div className="arrow" onClick={handleNext}>&rarr;</div>
        </div>
      </header>
    </div>
  );
}

export default PassCounter;
