import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import 'leaflet-gpx';
import './assets/App.css';

interface AppProps {
  gpxFile: File | null; // GPX file passed as a prop from Main.tsx
}

function App({ gpxFile }: AppProps): JSX.Element {
  useEffect(() => {
    if (gpxFile) {
      const map = L.map('map');

      // Fix broken image URLs in Leaflet's default marker icon
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIconPng,
        iconUrl: markerIconPng,
        shadowUrl: '',
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      const fileURL = URL.createObjectURL(gpxFile); // Create URL from the uploaded file

      const options = {
        async: true,
        polyline_options: { color: 'red' },
      };

      let starttime = document.getElementById('starttime');
      let endtime = document.getElementById('endtime');
      let distance = document.getElementById('distance');
      let averagehr = document.getElementById('averagehr');

      let GpxName = document.getElementById('GpxName');

      const gpx = new L.GPX(fileURL, options).on('loaded', (e) => {
        map.fitBounds(e.target.getBounds());
        const track = e.target;

        let get_name = track.get_name();

        // Cutting down start time to only show hours, minutes, and seconds
        let get_start_time = track.get_start_time();
        let starthours = get_start_time.getHours();
        let startminutes = get_start_time.getMinutes();
        if (startminutes < 10) {
          startminutes = '0' + startminutes;
        }
        let startseconds = get_start_time.getSeconds();
        let start = starthours + ':' + startminutes + ':' + startseconds;

        // Cutting down end time to only show hours, minutes, and seconds
        let get_end_time = track.get_end_time();
        let endhours = get_end_time.getHours();
        let endminutes = get_end_time.getMinutes();
        if (endminutes < 10) {
          endminutes = '0' + endminutes;
        }
        let endseconds = get_end_time.getSeconds();
        let end = endhours + ':' + endminutes + ':' + endseconds;

        let distancem = track.get_distance();
        let distancekm = distancem / 1000; // Convert meters to kilometers
        distancekm = distancekm.toFixed(2);
        distancekm.toString();

        GpxName.innerHTML = get_name;
        starttime.innerHTML = 'Start time: ' + start;
        endtime.innerHTML = 'End time: ' + end;
        distance.innerHTML = 'Distance: ' + distancekm + ' km';
        averagehr.innerHTML = 'Average HR: ' + track.get_average_hr();
      }).addTo(map);
    }
  }, [gpxFile]); // Re-run the effect when the gpxFile prop changes

  return (
    <>
      <div id='GpxName' className="name justify-left ml-12 text-8xl"></div>
      <div className="navbar justify-center items-center h-64">
      <div className="flex min-h-full place-content-center text-white text-lg border-solid border-2 border-white p-4 gap-4">
        <div className="flex flex-col items-center justify-center border-2 border-white p-2">
          <div id="starttime">Failed to Load, Please Reload</div>
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-white p-2">
          <div id="endtime">Failed to Load, Please Reload</div>
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-white p-2">
          <div id="distance">Failed to Load, Please Reload</div>
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-white p-2">
          <div id="averagehr">Failed to Load, Please Reload</div>
        </div>
      </div>
      </div>


      <div className="flex justify-center items-center">
        <div id="map" className="min-w-96 w-4/5 min-h-[630px] h-3/5"></div>
      </div>

    </>
  );
}

export default App;
