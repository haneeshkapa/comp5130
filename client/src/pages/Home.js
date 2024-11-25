// client/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomList from '../components/RoomList';

function Home() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [distanceFilter, setDistanceFilter] = useState(2);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('/api/rooms');
        setRooms(res.data);
        setFilteredRooms(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    // Apply distance filter
    let filtered = rooms.filter(room => room.distance <= distanceFilter);
    
    // Apply sorting
    if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredRooms(filtered);
  }, [rooms, distanceFilter, sortOrder]);

  const handleDistanceChange = (e) => {
    setDistanceFilter(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="distance" className="block mb-1">Max Distance (miles):</label>
          <input
            type="number"
            id="distance"
            value={distanceFilter}
            onChange={handleDistanceChange}
            min="0"
            max="10"
            step="0.1"
            className="px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="sort" className="block mb-1">Sort by Price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="px-3 py-2 border rounded"
          >
            <option value="">No sorting</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
        </div>
      </div>
      <RoomList rooms={filteredRooms} />
    </div>
  );
}

export default Home;