export default function WeatherIcon({ code }) {
  // icon name: [weather statuses]
  const images = {
    'clear.png': [0, 1],
    'partly_clouds.png': [2],
    'clouds.png': [3, 45, 48],
    'rain.png': [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    'snow-mini.png': [71, 73, 75, 77, 85, 86],
    'thunderstorm.png': [95, 96, 99]
  }

  function getIconImage() {
    for (const [image, statuses] of Object.entries(images)) {
      if (statuses.includes(code)) return image;
    }
    return ''; // if status is not found - maybe should replace with dummy icon
  }

  const image = getIconImage();

  return <img src={`/assets/${image}`} alt='weather icon' style={{ width: '30px' }} />
}
