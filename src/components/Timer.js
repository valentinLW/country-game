import { useEffect, useState } from 'react';

const Timer = ({endGame}) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if(time === 0) endGame();
    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, endGame]);

  return (
    <div className="timer">
      <p>{time}</p>
    </div>
  )
}

export default Timer;
