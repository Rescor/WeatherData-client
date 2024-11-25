import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

export default function MarkerIcon({ lat, long }) {
  const icon = new L.Icon({
    iconUrl: '/assets/marker_blue.png',
    iconSize: [19, 29],
    iconAnchor: [16, 32],
    popupAnchor: [-10, -32]
  });

  return <Marker position={[lat, long]} icon={icon} />
}
