import { useEffect, useState } from 'react';

const Timer = ({endGame}) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    if(time === 0) endGame();
    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="timer">
      <p>{time}</p>
    </div>
  )
}

export default Timer;