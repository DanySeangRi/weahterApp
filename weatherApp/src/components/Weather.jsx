import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from "react-icons/ci";

import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { GoSun } from "react-icons/go";
const Weather = () => {

    const getDayName = (timestamp) => {
        const date = new Date(timestamp * 1000); // convert to ms
        return date.toLocaleDateString('en-US', { weekday:'short' });
      };

    const inputRef = useRef(null)
    const [weatherData, setWeatherData] = useState(false);
 
    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert("city not found")
            }
            console.log(data);
 
          
            setWeatherData({
                humidity: data.main.humidity,
                speed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
               day: getDayName(data.dt)
            })

        } catch (error) {

        }
    }
    useEffect(() => {
        search("cambodia")
    }, [])



    return (
        <div className=' place-self-center p-10 rounded-2xl  bg-blue-800/50 flex items-center flex-col  '>
            <div className='flex flex-row items-center gap-3 justify-center '>
                <input className='border-0 bg-white outline-0 rounded-xl pl-3 font-grey text-xl h-12'
                 type="text" name="" id=""
                  placeholder='Search'
                  ref={inputRef}  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      search(inputRef.current.value);
                    }
                  }} />

                <CiSearch size={50} className='text-gray-700 bg-white rounded-full p-3 w-[50px] cursor-pointer' 
                onClick={() => search(inputRef.current.value)}
              />

            </div>
            <div className='text-center items-center '>
            <GoSun size={100} className=' my-10 mx-0  w-80 ' />
                <p className='text-white text-4xl leading-none'>{weatherData.temp}°c</p>
                <p className='text-white text-4xl'>{weatherData.location}</p>
            </div>

            <div className='flex gap-10 my-10'>
                <div className='flex items-center '>
                    <WiHumidity size={50} className='text-white' />
                    <div className='text-white'>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    
                    <FiWind size={50} className='text-white' />
                    <div className='text-white'>
                        <p>{weatherData.speed} </p>
                        <p>{weatherData.day}</p>
                        <span>Wind Speed</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather

