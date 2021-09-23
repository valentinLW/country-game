import '../css/StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start-screen">
      <h1>Country Trivia</h1>
      <h3>Try to guess as many countries as you can in 3 minutes!</h3>
      <button onClick={startGame}>Start</button>
    </div>
  )
}

export default StartScreen;
