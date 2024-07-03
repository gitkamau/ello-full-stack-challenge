import React from 'react';
import {
  Outlet
} from "react-router-dom";
import Header from './Header';

export default function PageLayout() {
  return (
    <div>
      <main>
        <Header />
        <Outlet />
      </main>
      {/* <div className="circle1"></div>
      <div className="circle2"></div> */}
    </div>
  );
}


