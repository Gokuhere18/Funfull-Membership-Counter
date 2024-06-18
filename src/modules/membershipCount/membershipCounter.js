import logo from '../../download.svg';
import React, { useState, useEffect } from 'react';
import './membershipCount.css';
import MyTimer from '../timer/timer';

function MembershipCounter() {
  const [data, setData] = useState(null);
  const [previousCount, setPreviousCount] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://dashboard-preprod.funfull.com/current_membership_count';
  
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        
        const urlForPass = 'https://dashboard-preprod.funfull.com/current_pass_count';
  
        const requestOptionsForPass = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        let responseForPass = await fetch(urlForPass, requestOptionsForPass);
        if (!responseForPass.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonDataForPass = await responseForPass.json();
        setData(jsonData && jsonDataForPass ? (jsonData[0].total_active_membership + jsonDataForPass[0].total_redeem).toLocaleString('en-IN') : jsonData ? jsonData[0].total_active_membership.toLocaleString('en-IN') : 0 );
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
      console.log(data)
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
  const time = new Date();
  time.setSeconds(time.getSeconds() + 59); // 10 minutes timer
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='Timer'>
          <MyTimer remainingTime={60}/>
        </div>
        <div className='count-1' id="count">
          {currentCount !== null && currentCount.toString().split('').map((digit, index) => (
            <span key={index} id={`digit-${index}`}>
              {digit}
            </span>
          ))}
        </div>
          <div>
          <data>Membership Count</data>
        </div>
      </header>
    </div>
  );
}

export default MembershipCounter;
