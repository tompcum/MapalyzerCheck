import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

import { useEffect } from 'react'

function App(): JSX.Element {

  useEffect(() => {
    var map = L.map('map').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  map.invalidateSize()
  })


  return (
    <>
        <div id="map" style={{ width: '100%', height: '670px' }}></div>
    </>
  )
}

export default App
