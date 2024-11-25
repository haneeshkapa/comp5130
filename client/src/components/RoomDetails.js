// client/src/components/RoomDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RoomDetails() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/rooms/${id}`);
        setRoom(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch room details');
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="room-details">
      <h2>{room.title}</h2>
      <p>Price: ${room.price}/month</p>
      <p>Address: {room.address}</p>
      <p>Description: {room.description}</p>
      <h3>Amenities:</h3>
      <ul>
        {room.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      {/* Add more details as needed */}
    </div>
  );
}

export default RoomDetails;