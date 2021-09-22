import './App.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import isocodes from './isocodes.json'

mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZW50aW5sdyIsImEiOiJja3JxOW5yeWUxeGVtMzBsNzc0aWFra3JrIn0.wwLgusrB4U7Cpb0q70g2tw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [guessed, setGuessed] = useState([]);
  const [guess, setGuess] = useState("");

  const handleChange = ({target}) => {
    setGuess(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = isocodes.filter(c => c.Country === guess);
    console.log("reuslt", result);

    if (result.length) {
      const guessIso = result[0]["Alpha-3 code"];
      console.log("guessed:", guessed);
      const isNewGuess = guessed.filter(g => g === guessIso).length === 0;
      if(isNewGuess) {
        console.log("new", guessIso);
        setGuessed(prev => [guessIso, ...prev]);
      }
    }
    setGuess("");
  }

  useEffect(() => {
    if(guessed.length === 0) return;
    map.current.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3", ...guessed
      ]);
  }, [guessed]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v8'
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
          'fill-opacity': 0.4,
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
      <div>
        <div ref={mapContainer} className="map-container" />
        <form onSubmit={handleSubmit} id="form">
          <input value={guess} onChange={handleChange} type="text"></input>
        </form>
      </div>
    </div>
  );
}

export default App;
