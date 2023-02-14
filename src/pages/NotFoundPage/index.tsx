import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => (

  <main className="h-screen w-full flex flex-col justify-center items-center shadow-xl">
    <h1 className="p-3 text-9xl font-extrabold text-white tracking-widest bg-[#1A2238] rounded-lg">404</h1>
    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button className="mt-5">
      <a
        className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span className="relative block px-8 py-3 bg-[#1A2238] border rounded-lg">
          <Link to="/">Go Home</Link>
        </span>
      </a>
    </button>
  </main>
);
export default NotFoundPage;
