import { useEffect, useState } from 'react';

const Timer = ({endGame}) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(time === 0) endGame();
  }, [time, endGame]);

  return (
    <div className="timer">
      <p>{time}</p>
    </div>
  )
}

export default Timer;
