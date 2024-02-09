import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Normal from './scenarios/Normal';
import Traffic from './scenarios/Traffic';
import Custom from './scenarios/Custom';

function ShipmentDetails({ shipments }) {
    const { id } = useParams();
    const shipment = shipments.find(s => s.id.toString() === id);
    const [stars, setStars] = useState(shipment.companyRating);

    const renderGraph = () => {
        switch (shipment.scenario) {
            case 'normal':
                return <Normal isGraph={true} />;
            case 'traffic':
                return <Traffic isGraph={true} />;
            case 'custom':
                return <Custom isGraph={true} />;
            default:
                return <div>Unknown scenario: {shipment.scenario}</div>;
        }
    };
    const renderWeather = () => {
        switch (shipment.scenario) {
            case 'normal':
                return <Normal isWeather={true} />;
            case 'traffic':
                return <Traffic isWeather={true} />;
            case 'custom':
                return <Custom isWeather={true} />;
            default:
                return <div>Unknown scenario: {shipment.scenario}</div>;
        }
    };

    const renderMap = () => {
        switch (shipment.scenario) {
            case 'normal':
                return <Normal isMap={true} />;
            case 'traffic':
                return <Traffic isMap={true} />;
            case 'custom':
                return <Custom isMap={true} />;
            default:
                return <div>Unknown scenario: {shipment.scenario}</div>;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-accent.green">
            <div className="flex justify-center absolute top-0 right-0 mt-4 mr-4 z-10">
                <Link to="/" className="w-60 flex justify-between items-center bg-pls-black px-4 py-2 rounded-md transition duration-500 ease-in-out transform hover:scale-105 hover:bg-pls-orange">
                    <span className="text-text.white font-semibold">Shipment # {id}</span>
                    <button className="text-text.white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="flex-grow" style={{ height: '60vh' }}>
                <div className="h-full w-1/4 float-left flex flex-col align-items-start justify-center px-4">
                    <div id="general-shipment-info" className="bg-white rounded-md shadow">
                        <div className="px-4 pt-4 grid grid-cols-2 text-left text-base font-normal space-x-4">
                            <div className="flex flex-col items-center">
                                <svg id="person-icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <span className="font-semibold">
                                    {shipment.driverName}
                                </span>
                                <span>
                                    {shipment.driverPhoneNumber}
                                </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg id="truck-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>

                                <span className="font-semibold">
                                    {shipment.vehicleLicensePlate}
                                </span>
                                <span>
                                    {shipment.vehicleColor} {shipment.vehicleType}
                                </span>
                                <span>
                                    {shipment.units} units
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center font-semibold">
                            {shipment.company}
                            {Array(stars).fill().map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#D34415" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            ))}
                        </div>

                        <div className="p-1 items-center justify-center text-center space-y-4">
                            <div>
                                <div>
                                    <h2 className="text-2xl font-medium">{shipment.originCity} </h2>
                                    <p className="text-base">Departed: {shipment.originDate}</p>
                                </div>
                                <div className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-medium">{shipment.destinationCity} </h2>
                                    <p className="text-base">Expected: {shipment.destinationDate}</p>
                                </div>
                            </div>
                            <div className="p-1">
                                <span className={`text-4xl font-medium ${shipment.safetyScore === 'Satisfactory' ? 'text-pls-green' : shipment.safetyScore === 'Unsatisfactory' ? 'text-red-600' : 'text-yellow-400'}`}>{shipment.safetyScore}</span>
                                <div className="text-base">DOT Safety Score</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-3/4 float-right">
                    {renderMap()}
                    {shipment.id !== 1 && (
                        <div className="relative bottom-0 right-0 p-2 text-xs text-right text-gray-500">
                            Route sped up for demonstration purposes
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-accent.green" style={{ height: '40vh' }}>
                <div className="grid grid-cols-2 p-4 space-x-4 h-full justify-items-center align-items-center text-center">
                    <div id="shipment-now" className="bg-white bg-opacity-90 p-1 h-full rounded-md shadow-md md:min-w-[550px] max-w-[700px] flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-1">
                                <span className={`text-4xl font-normal ${shipment.riskScore > 80 ? 'text-red-600' : shipment.riskScore >= 40 ? 'text-yellow-400' : 'text-pls-green'}`}>
                                    {shipment.riskScore}
                                </span>
                                <div className="text-base">Risk Score</div>
                            </div>
                            <div className="p-1">
                                <span className={`text-4xl font-medium ${shipment.isSafeZone === true ? 'text-pls-green' : shipment.isSafeZone === false ? 'text-red-600' : 'text-yellow-400'}`}>
                                    {shipment.isSafeZone === true ? 'Safe' : shipment.isSafeZone === false ? 'Unsafe' : 'Cautious'}
                                </span>
                                <div className="text-base">Zone</div>
                            </div>
                            <div className="p-1">
                                <span className="text-3xl font-normal">{shipment.milesLeft} miles left</span>
                                <div className="text-base">out of {shipment.totalMiles}</div>
                            </div>
                            <div className="p-1">
                                {renderWeather()}
                            </div>
                        </div>
                    </div>
                    <div id="shipment-overview" className="bg-white bg-opacity-90 p-2 h-full rounded-md shadow-md md:min-w-[550px] max-w-[700px]">
                        {renderGraph()}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShipmentDetails;
