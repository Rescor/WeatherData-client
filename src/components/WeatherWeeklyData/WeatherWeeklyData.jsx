import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';
import Widget from '../Widget/Widget';
import Loader from '../Loader';
import styles from './WeatherWeeklyData.module.css';

export default function WeatherWeeklyData({ lat, long, setError }) {
  const [weatherData, setWeatherData] = useState(undefined);

  useEffect( () => {
    async function fetchData() {
      try {
        const resp = await fetch(`https://weatherdata-server.onrender.com/api/data?latitude=${lat}&longitude=${long}`);
        const data = await resp.json();
        setWeatherData(data);
      } catch (error) {
        setError(error);
      }
    }
    // Under load, the weather service has a very aggressive anti-flood protection - so I delay this request for 100ms
    setTimeout(() => {
      fetchData()
    }, 100);
  }, [lat, long]);

  if (!weatherData) return <Loader />
  // TODO: Add logic (re-request if error etc.)
  if (weatherData.error) return <p style={{color: 'white'}}>Failed to load data</p>

  return <Widget title='Weather data (next 7 days):'>
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Date</th>
          <th className={styles.th}>Weather</th>
          <th className={styles.th}>Min</th>
          <th className={styles.th}>Max</th>
          <th className={styles.th}>Sunshine</th>
          <th className={styles.th}>Energy</th>
        </tr>
      </thead>

      <tbody>
        {weatherData.map(data => (
          <tr key={data.id} className={styles.tr}>
            <td className={styles.td}>{data.date}</td>
            <td className={styles.td}>
              <WeatherIcon code={data.weatherCode} />
            </td>
            <td className={styles.td}>{data.minTemp}°C</td>
            <td className={styles.td}>{data.maxTemp}°C</td>
            <td className={styles.td}>{data.sunshineDuration} min.</td>
            <td className={styles.td}>{data.generatedEnergy} kWh</td>
          </tr>
        ))}
      </tbody>

    </table>
  </Widget>
};
