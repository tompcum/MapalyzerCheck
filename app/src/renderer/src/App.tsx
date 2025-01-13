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

  const url = '/home/petja/Documents/Mapalyzer/app/src/renderer/src/assets/gpx/Lunch_Ride.gpx';  // URL to your GPX file
  const options = {
    async: true,
    polyline_options: { color: 'red' },
  };

  let starttime = document.getElementById('starttime');
  let endtime = document.getElementById('endtime');
  let distance = document.getElementById('distance');
  let averagehr = document.getElementById('averagehr');

  console.log(options); // Check the options object
  const gpx = new L.GPX(url, options).on('loaded', (e) => {
    map.fitBounds(e.target.getBounds());
    const track = e.target;

    // cutting down start time to only show hours, minutes, and seconds
    let get_start_time = track.get_start_time();
    let starthours = get_start_time.getHours();
    let startminutes = get_start_time.getMinutes();
    if (startminutes < 10) { // if under 10 then add the 0 to make it more legible.
      startminutes = '0' + startminutes;
    }
    let startseconds = get_start_time.getSeconds();
    let start = starthours + ':' + startminutes + ':' + startseconds;

    // cutting down end time to only show hours, minutes, and seconds
    let get_end_time = track.get_end_time();
    let endhours = get_end_time.getHours();
    let endminutes = get_end_time.getMinutes();
    if (endminutes < 10) { // if under 10 then add the 0 to make it more legible.
      endminutes = '0' + endminutes;
    }
    let endseconds = get_end_time.getSeconds();
    let end = endhours + ':' + endminutes + ':' + endseconds;

    let distancem = track.get_distance();
    let distancekm = distancem / 1000; // convert meters to kilometers
    distancekm = distancekm.toFixed(2);
    distancekm.toString();

    starttime.innerHTML = 'Start time: ' + start;
    endtime.innerHTML = 'End time: ' + end;
    distance.innerHTML = 'Distance: ' + distancekm + ' km';
    averagehr.innerHTML = 'Average HR: ' + track.get_average_hr();
  }).addTo(map);
  })


  return (
    <>
        <div className="navbar">
        <div className="grid">
          <div id="starttime">Failed to Load, Please Reload</div>
          <div id="endtime">Failed to Load, Please Reload</div>
          <div id="distance">Failed to Load, Please Reload</div>
          <div id="averagehr">Failed to Load, Please Reload</div>
        </div>
      </div>

        <div id="map" style={{ width: '900px', height: '630px'}}></div>
    </>
  )
}

export default App
