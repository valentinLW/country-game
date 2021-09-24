import './App.css';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import Timer from './components/Timer';
import Guesses from './components/Guesses';
import Map from './components/Map';
import GuessForm from './components/GuessForm';

import { useState } from 'react';

import isocodes from './isocodes.json'

function App() {

  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const [guessed, setGuessed] = useState([]);
  const [guess, setGuess] = useState("");

  const startGame = () => {
    setStarted(true);
  }

  const endGame = () => {
    setEnded(true);
  }

  const restartGame = () => {
    setGuessed([]);
    setGuess("");
    setEnded(false);
    setStarted(true);
  }

  const handleChange = ({target}) => {
    setGuess(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = isocodes.filter(c => c.Country === guess);

    if (result.length) {
      const guessIso = result[0]["Alpha-3 code"];
      const isNewGuess = guessed.filter(g => g === guessIso).length === 0;
      if(isNewGuess) {
        setGuessed(prev => [guessIso, ...prev]);
      }
    }
    setGuess("");
  }

  return (
    <div className="App">
      <div className="sidebar">
        <p>Timer</p>
        { started && !ended && <Timer endGame={endGame}/>}
      </div>
      { !started && <StartScreen startGame={startGame}/>}
      { ended && <EndScreen restartGame={restartGame} score={guessed.length}/>}
      <div className="game">
        <Map guessed={guessed}/>
        <GuessForm guess={guess} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
      <Guesses className="sidebar" countries={guessed}></Guesses>
    </div>
  );
}

export default App;
