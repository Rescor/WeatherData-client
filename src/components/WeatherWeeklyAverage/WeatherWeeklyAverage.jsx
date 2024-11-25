import React, { useState, useEffect } from 'react';
import Widget from '../Widget/Widget';
import Loader from '../Loader';
import styles from './WeatherWeeklyAverage.module.css';

export default function WeatherWeeklyAverage({ lat, long, setError }) {
  const [weatherData, setweatherData] = useState(undefined);

  useEffect( () => {
    async function fetchData() {
      try {
        const resp = await fetch(`https://weatherdata-server.onrender.com/api/summary?latitude=${lat}&longitude=${long}`);
        const data = await resp.json();
        setweatherData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [lat, long]);

  if (!weatherData) return <Loader />
  // TODO: Add logic (re-request if error etc.)
  if (weatherData.error) return <p style={{ color: 'white' }}>Failed to load data</p>

  return <Widget title="Average (next 7 days):">
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Pressure</th>
          <th className={styles.th}>Sunshine</th>
          <th className={styles.th}>Min</th>
          <th className={styles.th}>Max</th>
          <th className={styles.th}>Summary</th>
        </tr>
      </thead>

      <tbody>
        <tr className={styles.tr}>
          <td className={styles.td}>{weatherData.avgPressure} hPa</td>
          <td className={styles.td}>{weatherData.avgSunshine} min.</td>
          <td className={styles.td}>{weatherData.minTemp}°C</td>
          <td className={styles.td}>{weatherData.maxTemp}°C</td>
          <td className={styles.td}>{weatherData.summary}</td>
        </tr>
      </tbody>

    </table>
  </Widget>
};
