"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// JCS HQ Coordinates (Example: São Paulo center)
const JCS_HQ: [number, number] = [-23.55052, -46.633308];

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function Map({ 
  userLocation, 
  onDistanceCalculated 
}: { 
  userLocation: [number, number] | null;
  onDistanceCalculated: (distance: number) => void;
}) {
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (userLocation) {
      // Simple straight-line distance calculation (Haversine formula approximation for demo)
      const R = 6371; // km
      const dLat = (userLocation[0] - JCS_HQ[0]) * Math.PI / 180;
      const dLon = (userLocation[1] - JCS_HQ[1]) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(JCS_HQ[0] * Math.PI / 180) * Math.cos(userLocation[0] * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const dist = R * c;
      setDistance(dist);
      onDistanceCalculated(dist);
    }
  }, [userLocation, onDistanceCalculated]);

  return (
    <div className="h-[300px] w-full rounded-none overflow-hidden border border-white/10 z-0">
      <MapContainer center={JCS_HQ} zoom={10} style={{ height: "100%", width: "100%" }} attributionControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* JCS Location */}
        <Marker position={JCS_HQ} icon={icon} />
        
        {/* Coverage Areas */}
        <Circle center={JCS_HQ} pathOptions={{ color: '#25D366', fillColor: '#25D366' }} radius={30000} /> {/* 30km */}
        <Circle center={JCS_HQ} pathOptions={{ color: '#EAB308', fillColor: '#EAB308', fillOpacity: 0.1 }} radius={60000} /> {/* 60km */}

        {userLocation && (
          <>
            <Polyline 
              positions={[JCS_HQ, userLocation]} 
              pathOptions={{ color: '#ef4444', weight: 3, dashArray: '10, 10', className: 'animate-dash' }} 
            />
            <Marker position={userLocation} icon={icon} />
            <ChangeView center={userLocation} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
