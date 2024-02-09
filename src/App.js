import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ShipmentDetails from './ShipmentDetails';

function App() {
  const shipments = [
    {
      id: 1,
      scenario: 'normal',
      riskScore: 2,
      isSafeZone: true,
      milesLeft: 2,
      totalMiles: 5,
      temperature: 48,
      driverName: "Mike Smith",
      driverPhoneNumber: "412-123-4567",
      vehicleLicensePlate: "MNE2394",
      vehicleType: "Flatbed",
      vehicleColor: "Blue",
      company: "Company ABC",
      companyRating: 4,
      units: 500,
      safetyScore: "Conditional",
      originCity: "Downtown Pittsburgh",
      originDate: "1/2/24 6:21am",
      destinationCity: "Squirrel Hill North",
      destinationDate: "1/2/24 6:37am",
    },
    {
      id: 2,
      scenario: 'traffic',
      routeScore: 63,
      riskScore: 98,
      isSafeZone: null,
      milesLeft: 138,
      totalMiles: 140,
      temperature: 23,
      driverName: "Peter Williams",
      driverPhoneNumber: "410-284-5829",
      vehicleLicensePlate: "DIW3948",
      vehicleType: "Tanker",
      vehicleColor: "White",
      company: "Company DEF",
      companyRating: 3,
      units: 968,
      safetyScore: "Unsatisfactory",
      originCity: "Cleveland, OH",
      originDate: "1/23/24 5:21pm",
      destinationCity: "Pittsburgh, PA",
      destinationDate: "1/24/24 7:46pm",
    },
    {
      id: 3,
      scenario: 'custom',
      routeScore: 22,
      riskScore: 35,
      isSafeZone: null,
      milesLeft: 645,
      totalMiles: 667,
      temperature: 56,
      driverName: "Flynn Jacobs",
      driverPhoneNumber: "214-384-2228",
      vehicleLicensePlate: "JDI2948",
      vehicleType: "Lowbed",
      vehicleColor: "Black",
      company: "Company GHI",
      companyRating: 4,
      units: 433,
      safetyScore: "Satisfactory",
      originCity: "Portland, OR",
      originDate: "2/08/24 6:25am",
      destinationCity: "Santa Clara, CA",
      destinationDate: "2/08/24 7:14pm",
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage shipments={shipments} />} />
        <Route path="/shipment/:id" element={<ShipmentDetails shipments={shipments} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
