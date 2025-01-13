import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx'

import { useEffect } from 'react'

function App(): JSX.Element {


  useEffect(() => {
    var map = L.map('map');
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const url = 'https://mpetazzoni.github.io/leaflet-gpx/demo.gpx';  // URL to your GPX file
  const options = {
    async: true,
    polyline_options: { color: 'red' },
  };

  console.log(options); // Check the options object
  const gpx = new L.GPX(url, options).on('loaded', (e) => {
    map.fitBounds(e.target.getBounds());
  }).addTo(map);

  })


  return (
    <>
        <div id="map" style={{ width: '100%', height: '670px' }}></div>
    </>
  )
}

export default App
