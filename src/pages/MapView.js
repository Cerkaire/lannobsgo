import React, { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Typography, Box } from '@mui/material';
import { db } from '../db/db';

const { BaseLayer } = LayersControl;

export default function MapView({ mapRef, mapCenter, setMapCenter }) {
    const [initialCenterSet, setInitialCenterSet] = useState(false);
    const [clickedPosition, setClickedPosition] = useState(null);
    const userPositionRef = useRef(null);

    // Handler for user location
    function LocationUser() {
        const map = useMapEvents({
            locationfound(e) {
                if (!userPositionRef.current) {
                    userPositionRef.current = e.latlng;
                    setMapCenter(e.latlng);
                    if (!initialCenterSet) {
                        map.flyTo(e.latlng, map.getZoom());
                        setInitialCenterSet(true);
                    }
                }
            },
        });

        useEffect(() => {
            map.locate();
        }, [map]);

        return userPositionRef.current ? (
            <Marker position={userPositionRef.current}>
                <Popup>You are here</Popup>
            </Marker>
        ) : null;
    }

    // Handler for clicked position
    function LocationMarker() {
        useMapEvents({
            click(e) {
                setClickedPosition(e.latlng);
            },
        });

        return clickedPosition ? (
            <Marker position={clickedPosition}>
                <Popup>
                    You clicked at {clickedPosition.lat}, {clickedPosition.lng}
                </Popup>
            </Marker>
        ) : null;
    }

    const handleValidateClick = async () => {
        if (clickedPosition) {
            try {
                await db.coordinates.add({
                    lat: clickedPosition.lat,
                    lng: clickedPosition.lng,
                });
                console.log('Coordinates saved:', clickedPosition);
            } catch (error) {
                console.error('Failed to save coordinates:', error);
            }
        }
    };

    return (
        <Card sx={{ height: "auto", width: "100%" }}>
            <MapContainer
                center={mapCenter}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "450px", width: "100%" }}
                whenCreated={mapInstance => { mapRef.current = mapInstance; }}
            >
                <LayersControl position="topright">
                    <BaseLayer checked name="OpenStreetMap Topographic">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        />
                    </BaseLayer>
                    <BaseLayer name="Ortho Imagery">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://data.geopf.fr/tms/1.0.0/ORTHOIMAGERY.ORTHOPHOTOS/{z}/{x}/{y}.jpeg"
                        />
                    </BaseLayer>
                </LayersControl>
                <LocationMarker />
                <LocationUser />
            </MapContainer>

            {clickedPosition && (
                <Box sx={{ padding: 2 }}>
                    <Typography variant="body1">
                        Coordinates: {clickedPosition.lat}, {clickedPosition.lng}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleValidateClick}>
                        Valider
                    </Button>
                </Box>
            )}
        </Card>
    );
}
