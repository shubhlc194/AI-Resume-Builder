import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/clerk-react'
const Header = () => {
  return (
    <div className='p-1 px-5 flex justify-between items-center border-b border-gray-200'>
      
      {/* Logo */}
      <img src='logo.svg' height={60} width={60} />

      {/* Button */}
      <UserButton/>
      <Link to='/auth/sign-in'>
        <button className="group relative px-8 py-2.5 rounded-xl font-semibold text-white overflow-hidden">
          
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 transition-all duration-300 group-hover:scale-110"></span>
          
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
          
          <span className="relative z-10 tracking-wide">
            Get Started
          </span>
        </button>
      </Link>

    </div>
  )
}

export default Header
