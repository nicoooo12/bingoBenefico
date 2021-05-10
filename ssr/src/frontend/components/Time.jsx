import React, { useState } from 'react';

// import '../assets/styles/components/MainContent.scss';
const App = ({ deadline = '2021-05-07T19:00', finalMessage = 'Ya Empezamos' })=> {

  const getRemainingTime = (deadline) => {
    const now = new Date(),
      remainTime = (new Date(deadline) - now + 1000) / 1000,
      remainSeconds = Math.floor(remainTime % 60),
      remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
      remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
      remainDays = Math.floor(remainTime / (3600 * 24));

    return {
      remainSeconds,
      remainMinutes,
      remainHours,
      remainDays,
      remainTime,
    };
  };

  const [time, setTime] = useState(getRemainingTime(deadline).remainTime >= 1 ? `${getRemainingTime(deadline).remainDays !== 0 ? getRemainingTime(deadline).remainDays + 'd:' : ''}${getRemainingTime(deadline).remainHours !== '00' ? getRemainingTime(deadline).remainHours + 'h:' : ''}${getRemainingTime(deadline).remainMinutes !== '00' ? getRemainingTime(deadline).remainMinutes + 'm:' : ''}${getRemainingTime(deadline).remainMinutes !== 0 ? ('0' + getRemainingTime(deadline).remainSeconds).slice(-2) : getRemainingTime(deadline).remainSeconds}s` : finalMessage);

  const countdown = (deadline, finalMessage) => {

    const timerUpdate = setTimeout(() => {
      const t = getRemainingTime(deadline);
      setTime(`${t.remainDays !== 0 ? t.remainDays + 'd:' : ''}${t.remainHours !== '00' ? t.remainHours + 'h:' : ''}${t.remainMinutes !== '00' ? t.remainMinutes + 'm:' : ''}${t.remainMinutes !== 0 ? ('0' + t.remainSeconds).slice(-2) : t.remainSeconds}s`);

      if (t.remainTime <= 1) {
        clearInterval(timerUpdate);
        setTime(finalMessage);
      }

    }, 1000);
  };

  getRemainingTime(deadline).remainTime >= 1 && countdown(deadline, finalMessage);
  return (
    <>
      { time }
    </>
  );

};

export default App;
