import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-2 border-b bg-white shadow-sm">
      
      {/* Logo */}
      <Link to="/">
        <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* When User is Signed In */}
        <SignedIn>
          <Link to="/dashboard">
            <button className="px-5 py-2 rounded-lg font-medium text-sm border hover:bg-gray-100 transition">
              Dashboard
            </button>
          </Link>

          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* When User is Signed Out */}
        <SignedOut>
          <Link to="/auth/sign-in">
            <button className="group relative px-6 py-2 rounded-lg font-semibold text-white overflow-hidden">
              
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 transition-all duration-300 group-hover:scale-110"></span>
              
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
              
              <span className="relative z-10 tracking-wide">
                Get Started
              </span>

            </button>
          </Link>
        </SignedOut>

      </div>
    </header>
  );
};

export default Header;