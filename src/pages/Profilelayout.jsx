import React from 'react';
import Sidebar from '../components/Profile/Sidebar';

const Userlayout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Fixed Sidebar */}
          <div className="lg:col-span-3 lg:sticky lg:top-8 self-start">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9 bg-white p-4 rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlayout;
