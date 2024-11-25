import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerIcon from './MarkerIcon';

export default function WorldMap({ lat, long, setPosition }) {
  const mapParams = {
    center: [lat, long],
    zoom: 15,
    style: { width: '100%', height: '100dvh' }
  }

  // Component for handling clicks on map
  const MapClickHandler = function() {
    useMapEvents({
      click: event => {
        const { lat, lng } = event.latlng;
        setPosition({ lat, long: lng });
      }
    });
    return null;
  };

  return <MapContainer center={mapParams.center} zoom={mapParams.zoom} style={mapParams.style}>
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
    />
    <MapClickHandler />
    <MarkerIcon lat={lat} long={long} />
  </MapContainer>
};
