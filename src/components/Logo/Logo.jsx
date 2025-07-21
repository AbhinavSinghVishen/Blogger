import React from 'react'
import logo from '../../assets/Logo.png'

const Logo = ({ mode='dark' }) => {
  return (
    <div className='rounded-2xl'>
      <div className=' flex  overflow-hidden'>
        <img src={logo} alt='MegaBloggerLogo' className='max-w-10 rounded-2xl max-h-10' />
        <div className=' flex-col '>
          <div className='min-h-1'></div>
          <div className={`text-2xl font-bold min-h-8 min-w-40 ${mode === 'dark' ?  'text-gray-200' : 'text-black' }`}>
            LOGGER
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logo
