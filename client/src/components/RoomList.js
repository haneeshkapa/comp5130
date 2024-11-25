// client/src/components/RoomList.js
import React from 'react';
import { Link } from 'react-router-dom';

function RoomList({ rooms }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map(room => (
        <div key={room._id} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={room.image || '/placeholder-room.jpg'} alt={room.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
            <p className="text-gray-600 mb-2">Price: ${room.price}/month</p>
            <p className="text-gray-600 mb-2">Distance: {room.distance} miles</p>
            <Link to={`/room/${room._id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;