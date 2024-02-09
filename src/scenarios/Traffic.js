import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import WeatherDisplay from '../WeatherDisplay';
import RiskChart from '../RiskChart';
import { calculateRiskScore } from '../riskCalculator';

// change these
const dotSafetyScore = 'Satisfactory';
const historicalReliability = 95;
const valueOfGoods = 50000;
const weatherConditions = 'Clear';

/*
    This is a Traffic scenario that is used to highlight the risk
    graph and calculations in the context of a traffic scenario.
    As the truck continues on and experiences delays, the risk
    increases due to the distance the truck is from where it is 
    expected to be (without traffic) and the extension of its
    estimated arrival time.
*/

export const Traffic = ({ isWeather = false, isMap = false, isGraph = false }) => {
    const [center, setCenter] = useState({ lat: 40.4432, lng: -79.9428 });
    const [zoom, setZoom] = useState(11);
    const [distanceData, setDistanceData] = useState([]);
    const [risk, setRisk] = useState(Array(10).fill(null));
    const [initialDuration, setInitialDuration] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const request = {
        origin: '100 Alfred Lerner Way, Cleveland, OH 44114',
        destination: '5087 Forbes Ave, Pittsburgh, PA 15213',
        travelMode: 'DRIVING',
    };

    const handleApiLoaded = (map, maps) => {
        const localDirectionsService = new maps.DirectionsService();
        const directionsRenderer = new maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        localDirectionsService.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
                setInitialDuration(result.routes[0].legs[0].duration.value);

                for (let route of result.routes) {
                    for (let warning of route.warnings) {
                        console.log(warning);
                    }
                }

                const truckMarker = new maps.Marker({
                    position: result.routes[0].legs[0].steps[0].start_location,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/truck.png",
                        scaledSize: new maps.Size(32, 32),
                    },
                });

                const path = result.routes[0].overview_path;
                let step = 0;
                let numSteps = 3000;
                let delay = 500;
                let artificialDistanceMultiplier = 1; // Start with no artificial increase
                let distance = 1;

                window.setInterval(() => {
                    if (step < numSteps && path[step + 1]) {
                        console.log(step)
                        const position = maps.geometry.spherical.interpolate(path[step], path[step + 1], 0.5);
                        truckMarker.setPosition(position);

                        // Artificially inflate distance after 5 seconds (or a certain number of steps)
                        if (step >= 3) { // Assuming the step interval is 200ms, 25 steps is roughly 5 seconds
                            console.log("inflate!!");
                            artificialDistanceMultiplier = 1.5; // Start inflating the distance
                        }

                        const expectedPosition = position;
                        const currentPosition = truckMarker.getPosition();

                        console.log('before', distance)
                        // Apply the artificial inflation
                        distance *= artificialDistanceMultiplier;
                        console.log(distance)

                        setDistanceData(prevData => [...prevData, distance]);

                        const risk = (100 * calculateRiskScore(dotSafetyScore, historicalReliability, distance, valueOfGoods, weatherConditions)).toFixed(2);
                        setRisk(prevRisk => [...prevRisk.slice(1), { time: new Date(), value: risk }]);

                        console.log(`The truck is ${distance} meters away from its expected position.`);
                        console.log(`The risk is ${risk}%`);

                        step++;
                    }
                }, delay);
            }
        });

        setDirectionsService(localDirectionsService);

        const trafficLayer = new maps.TrafficLayer();
        trafficLayer.setMap(map);
    };

    useEffect(() => {
        if (directionsService && initialDuration) {
            const checkForRerouting = setInterval(() => {
                directionsService.route(request, (result, status) => {
                    if (status === 'OK') {
                        const currentDuration = result.routes[0].legs[0].duration.value;
                        if (currentDuration > initialDuration * 1.15) {
                            console.log('Significant delay detected. Rerouting is suggested.');
                        }
                    }
                });
            }, 5000);

            return () => clearInterval(checkForRerouting);
        }
    }, [directionsService, initialDuration]);

    return (
        <div>
            {isMap && (
                <div style={{ height: '60vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                        defaultCenter={center}
                        defaultZoom={zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    />
                </div>
            )}

            {isWeather && (
                <>
                    <WeatherDisplay lat={center.lat} lng={center.lng} />
                </>
            )}
            {isGraph && (
                <div>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                        defaultCenter={center}
                        defaultZoom={zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    />
                    <RiskChart style={{ flex: 1 }} data={risk} />
                </div>
            )}
        </div>
    );
};

export default Traffic;
