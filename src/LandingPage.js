import React from 'react';
import ShipmentCard from './ShipmentCard';

const LandingPage = ({ shipments }) => {
    return (
        <div className="flex flex-col md:flex-row h-screen text-text.default">
            <div className="w-full md:w-1/3 m-4 flex flex-col items-start">
                <img src='/images/logo.png' alt="Logo" className="w-36 h-auto pb-4" />
                <div id="outbound-shipments" className="flex flex-col items-center justify-center w-full ">
                    <h2 className="text-3xl text-center mb-4">Outbound Shipments</h2>
                    <div className="space-y-4 w-full">
                        {shipments.map((shipment) => (
                            <ShipmentCard key={shipment.id} shipment={shipment} />
                        ))}
                    </div>
                </div>
            </div>
            <div id="map" className="w-full md:w-2/3">
                <img src="/images/homepage-map.png" alt="map of pittsburgh" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}

export default LandingPage;