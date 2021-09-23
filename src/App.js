import './App.css';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import Timer from './components/Timer';
import Guesses from './components/Guesses';

import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import isocodes from './isocodes.json'

mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZW50aW5sdyIsImEiOiJja3JxOW5yeWUxeGVtMzBsNzc0aWFra3JrIn0.wwLgusrB4U7Cpb0q70g2tw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

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

  useEffect(() => {
    if (!map.current) return;
    map.current.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3", ...guessed
      ]);
  }, [guessed]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/valentinlw/cktwuv20b155e18mcotpk3apf',
      zoom: 1,
      minZoom: 1,
      maxZoom: 1,
      center: [1, 1],
      renderWorldCopies: false,
      interactive: false,
    });

    map.current.on('load', function() {
      map.current.addLayer({
        id: 'country-boundaries',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        },
        'source-layer': 'country_boundaries',
        type: 'fill',
        paint: {
          'fill-color': '#d2361e',
        },
      });
      map.current.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3", ...guessed
      ]);
    });
  });

  return (
    <div className="App">
      <div className="sidebar">
        <p>Timer</p>
        { started && !ended && <Timer endGame={endGame}/>}
      </div>
      { !started && <StartScreen startGame={startGame}/>}
      { ended && <EndScreen restartGame={restartGame} score={guessed.length}/>}
      <div className="game">
        <div ref={mapContainer} className="map-container" />
        <form onSubmit={handleSubmit} id="form">
          <input value={guess} onChange={handleChange} type="text" id="guess-input" placeholder="country" autocomplete="off"></input>
        </form>
      </div>
      <Guesses className="sidebar" countries={guessed}></Guesses>
    </div>
  );
}

export default App;
