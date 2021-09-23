import '../css/EndScreen.css';

const EndScreen = ({restartGame, score}) => {
  return (
    <div className="start-screen">
      <h1>Country Trivia</h1>
      <h3>You guessed {score} countries!</h3>
      <button onClick={restartGame}>Start</button>
    </div>
  )
}

export default EndScreen;
