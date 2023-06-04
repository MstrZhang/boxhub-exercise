import { useState, useEffect } from 'react';
// @ts-ignore: leaflet-geosearch type is broken
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { latLngBounds, LatLngBounds } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapProps {
  originAddress: string;
  shippingAddress: string;
}

interface ProviderResult {
  x: number;
  y: number;
  label: string;
  bounds: [[number, number], [number, number]];
  raw: any;
}

function LocationMarker({ geo }: { geo?: ProviderResult }) {
  return geo ? (
    <Marker position={[geo.y, geo.x]}>
      <Popup>{geo.label}</Popup>
    </Marker>
  ) : null;
}
export function Map({ originAddress, shippingAddress }: MapProps) {
  const [originGeo, setOriginGeo] = useState<ProviderResult>();
  const [shippingGeo, setShippingGeo] = useState<ProviderResult>();
  const [bounds, setBounds] = useState<LatLngBounds>();

  useEffect(() => {
    // ideally the frontend would not have to geocode an address string
    // and would receive a lng/lat object (or this object itself) from the backend
    // NOTE: had to adjust some address strings in orders.json (free geocoder can't resolve some addresses)
    const getAddressLngLat = async () => {
      const provider = new OpenStreetMapProvider();
      const originResults = await provider.search({ query: originAddress });
      const shippingResults = await provider.search({ query: shippingAddress });

      const markerBounds = latLngBounds([]);
      markerBounds.extend(originResults[0].bounds);
      markerBounds.extend(shippingResults[0].bounds);

      setOriginGeo(originResults[0]);
      setShippingGeo(shippingResults[0]);
      setBounds(markerBounds);
    };

    getAddressLngLat();
  }, []);

  return bounds ? (
    <>
      <MapContainer
        className="h-full w-auto"
        center={bounds.getCenter()}
        bounds={bounds}
        zoom={8}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker geo={originGeo} />
        <LocationMarker geo={shippingGeo} />
      </MapContainer>
    </>
  ) : null;
}
