// import '../css/Map.css';
import { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZW50aW5sdyIsImEiOiJja3JxOW5yeWUxeGVtMzBsNzc0aWFra3JrIn0.wwLgusrB4U7Cpb0q70g2tw';


const Map = ({guessed}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) return;

      map.current.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3", ...guessed
      ]);

      map.current.setFilter('country-boundaries2', [
        "in",
        "iso_3166_1_alpha_3", ...guessed.slice(1)
      ]);
  }, [guessed]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/valentinlw/cktwuv20b155e18mcotpk3apf',
      zoom: 1,
      center: [1, 1],
      renderWorldCopies: false,
      interactive: true,
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
      map.current.addLayer({
        id: 'country-boundaries2',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        },
        'source-layer': 'country_boundaries',
        type: 'fill',
        paint: {
          'fill-color': '#ff7e30',
        },
      });
      map.current.setFilter('country-boundaries', [
        "in",
        "iso_3166_1_alpha_3", ...guessed
      ]);
      map.current.setFilter('country-boundaries2', [
        "in",
        "iso_3166_1_alpha_3", ...guessed.slice(1)
      ]);
    });
  });

  return (
    <div ref={mapContainer} className="map-container" />
  )
}

export default Map;
