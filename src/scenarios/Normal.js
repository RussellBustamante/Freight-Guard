import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import WeatherDisplay from '../WeatherDisplay';
import RiskChart from '../RiskChart';
import { calculateRiskScore } from '../riskCalculator';

// Change these
const dotSafetyScore = 'Satisfactory';
const historicalReliability = 95
const valueOfGoods = 50000;
const weatherConditions = 'Clear';

/*
    This is a Normal scenario that is used to demonstrate the basic
    capabilities of Freight Guard and how it may be used in a real-world
    supply chain scenario. Please note that all data used in these scenarios
    are mock data and do not reflect the actual safety or reliability of
    any real-world entities. However, its application to real scenarios
    is extensible and feasible.
*/

export const Normal = ({ isWeather = false, isMap = false, isGraph = false }) => {
  const [center, setCenter] = useState({ lat: 40.4432, lng: -79.9428 });
  const [zoom, setZoom] = useState(11);
  const [distanceData, setDistanceData] = useState([]);
  const [risk, setRisk] = useState(Array(10).fill(null));
  const [initialDuration, setInitialDuration] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const request = {
    origin: 'PPG Paints Arena, 1001 Fifth Ave, Pittsburgh, PA 15219',
    destination: '5646 Northumberland St Pittsburgh PA 15217',
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

        // Log any warnings
        for (let route of result.routes) {
          for (let warning of route.warnings) {
            console.log(warning);
          }
        }

        // Create a marker that represents the truck
        const truckMarker = new maps.Marker({
          position: result.routes[0].legs[0].steps[0].start_location,
          map: map,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/truck.png", // replace with the URL of your truck icon
            scaledSize: new maps.Size(32, 32),
          },
        });

        // Get the path of the route
        const path = result.routes[0].overview_path;

        let step = 0; // the index of the current step
        let numSteps = 3000; // the number of steps in the animation
        let delay = 1800; // the delay in milliseconds between steps

        // Start the animation
        window.setInterval(() => {
          if (step < numSteps && path[step + 1]) {
            // Calculate the position of the truck
            const position = maps.geometry.spherical.interpolate(path[step], path[step + 1], 0.5);

            // Update the position of the truck marker
            truckMarker.setPosition(position);

            // Calculate the expected position of the truck
            const expectedPosition = position;

            // Calculate the current position of the truck
            const currentPosition = truckMarker.getPosition();

            // Calculate the distance between the current and expected positions
            const distance = maps.geometry.spherical.computeDistanceBetween(currentPosition, expectedPosition);

            // Update the distanceData state
            setDistanceData(prevData => [...prevData, distance]);

            // Calculate the risk
            //const risk = (100 * calculateRiskScore(dotSafetyScore, historicalReliability, distance, valueOfGoods, weatherConditions)).toFixed(2);
            // Calculate the risk with slight randomness involved (temporary)
            const risk = (100 * calculateRiskScore(dotSafetyScore, historicalReliability, distance + Math.random() * 100, valueOfGoods, weatherConditions)).toFixed(2);
            // Update the risk state
            setRisk(prevRisk => [...prevRisk.slice(1), { time: new Date(), value: risk }]);

            console.log(`The truck is ${distance} meters away from its expected position.`);
            console.log(`The risk is ${risk}%`);

            step++;
          }
        }, delay);
      }
    });

    setDirectionsService(localDirectionsService); // Set the DirectionsService instance

    const trafficLayer = new maps.TrafficLayer();
    trafficLayer.setMap(map);

  };

  // Consider rerouting if initial duration significantly changes
  React.useEffect(() => {
    if (directionsService && initialDuration) { // Ensure directionsService is not null
      const checkForRerouting = setInterval(() => {
        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            const currentDuration = result.routes[0].legs[0].duration.value;
            if (currentDuration > initialDuration * 1.15) { // 15% longer than initial
              console.log('Significant delay detected. Rerouting is suggested.');
            }
          }
        });
      }, 5000); // Check every 5 seconds

      return () => clearInterval(checkForRerouting);
    }
  }, [directionsService, initialDuration]); // Add directionsService as a dependency  

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

export default Normal;