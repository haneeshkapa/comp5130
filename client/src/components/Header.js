import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">RoomRental</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/post-room" className="hover:underline">Post Room</Link></li>
          <li><Link to="/profile" className="hover:underline">Profile</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
          <li><Link to="/register" className="hover:underline">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;