import React from 'react';
import Sidebar from '@/components/admin/AdminSidebar';
import Header from '@/components/admin/AdminHeader';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1">
        {/* <Header /> */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <h3 className="text-xl">Total Orders</h3>
              <p className="text-2xl">128</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <h3 className="text-xl">Total Products</h3>
              <p className="text-2xl">54</p>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg">
              <h3 className="text-xl">Total Customers</h3>
              <p className="text-2xl">102</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
