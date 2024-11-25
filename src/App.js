// Unfortunately, due to my workload, I only had one day to work on the test assignment.
// I tried to implement as many things as possible.
// If you are interested, you can take a look at some of my other projects:
// - https://aww.xyz/ - my personal website
// -- (Probably) The best domain on the Internet!
// - https://krtd.net/ - online radio station
// -- KRTD is an online radio station featuring various musical genres, mostly rock and alternative,
// -- and with live radio broadcasts
// - https://netstalking.org/ - Internet research community
// - http://radiotower.netstalking.org/ - Internet radio stations aggregator
// - https://tulpamancy.org/ – community forum

import { useEffect, useState } from 'react';
import WeatherWeeklyData from './components/WeatherWeeklyData/WeatherWeeklyData'
import WeatherWeeklyAverage from './components/WeatherWeeklyAverage/WeatherWeeklyAverage';
import WorldMap from './components/WorldMap/WorldMap';
import WidgetArea from './components/WidgetArea/WidgetArea';
import styles from './App.module.css';

function App() {
  const [position, setPosition] = useState(undefined);
  const [error, setError] = useState(null);

  // Checking is the browser supports geolocation
  // If it does not support or user does not give consent, set Kyiv as default coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, long: longitude });
        }, error => {
          setPosition({ lat: 50.4501, long: 30.5234 });
          console.error("Error getting location:", error);
        }
      );
    } else {
      setPosition({ lat: 50.4501, long: 30.5234 });
      console.warn("Geolocation is not supported by your browser.");
    }
  }, []);

  // Re-render components when the position coordinates changes
  useEffect(() => { }, [position]);


  // If we receive an error from the server
  // TODO: make more complex logic depending on the error status
  if (error) {
    console.log(error);
    setError(null);
  }

  if (position) return <div className={styles.app}>
    <WorldMap lat={position.lat} long={position.long} setPosition={setPosition} />

    <WidgetArea>
      <WeatherWeeklyData lat={position.lat} long={position.long} setError={setError} />
      <WeatherWeeklyAverage lat={position.lat} long={position.long} setError={setError} />
    </WidgetArea>
  </div>

  // TODO - make it prettier
  return <p>Waiting to geo permission...</p>
}

export default App;
