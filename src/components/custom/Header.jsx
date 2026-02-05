import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='p-1 px-5 flex justify-between'>
     <img src='logo.svg' height={60} width={60}></img>
<button className="group relative px-9 py-3 rounded-xl font-semibold text-white overflow-hidden">
  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 transition-all duration-300 group-hover:scale-110"></span>
  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
  <span className="relative z-10">Get Started</span>
</button>


    </div>
  )
}

export default Header
