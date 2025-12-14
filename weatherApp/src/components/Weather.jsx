import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiCloudOn } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
const Weather = () => {
  return (
    <div className=' place-self-center p-10 rounded-2xl  bg-blue-800/50 flex items-center flex-col  '>
            <div className='flex flex-row items-center gap-3 justify-center '>
                <input className='border-0 bg-white outline-0 rounded-xl pl-3 font-grey text-xl h-12'
                 type="text" name="" id=""
                  placeholder='Search'
                  />

                <CiSearch size={50} className='text-gray-700 bg-white rounded-full p-3 w-[50px] cursor-pointer' 
                
              />

            </div>
            <div className='text-center items-center '>
            <CiCloudOn size={100} className='my-10 mx-0  w-80 text-amber-300' />
                <p className='text-white text-4xl leading-none'>67°c</p>
                <p className='text-white text-4xl'>london</p>
            </div>

            <div className='flex gap-10 my-10'>
                <div className='flex items-center '>
                    <WiHumidity size={50} className='text-white' />
                    <div className='text-white'>
                        <p>87%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    
                    <FiWind size={50} className='text-white' />
                    <div className='text-white'>
                        <p>36.km </p>
                        <p>Monday</p>
                        <span>Wind Speed</span>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default Weather