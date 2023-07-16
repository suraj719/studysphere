import React from 'react'

function SideNav() {
  return (
    <div className='w-56 h-full border-r-2 flex flex-col gap-2 p-4 '>
           <button className='text-white font-light bg-black bg-opacity-50 p-2 rounded-sm'>Overview</button>
           <button className='text-white font-light bg-black bg-opacity-50 p-2 rounded-sm'>My projects</button>
    </div>
  )
}

export default SideNav
