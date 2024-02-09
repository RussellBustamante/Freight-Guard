import React from 'react';
import { Link } from 'react-router-dom';

const ShipmentCard = ({ shipment }) => {
  return (
    <Link to={`/shipment/${shipment.id}`} className="group py-3 px-5 text-text.default border border-pls-black rounded-md shadow flex items-center transition duration-500 ease-in-out transform hover:scale-105 hover:bg-pls-orange">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-center">
          <h5 className="text-2xl text-text.default group-hover:text-text.white">
            Shipment
            <span className={`ml-2 ${[1, 3].includes(shipment.id) ? 'text-[#008001]' : shipment.id === 2 ? 'text-yellow-400' : ''}`}>
              #{shipment.id}
            </span>
          </h5>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 group-hover:text-text.white" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </Link>
  )
};

export default ShipmentCard;