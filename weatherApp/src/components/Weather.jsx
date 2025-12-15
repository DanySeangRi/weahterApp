import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { GoSun } from "react-icons/go";
import { WiHumidity } from "react-icons/wi";
import { CiCloudSun } from "react-icons/ci";
import { CiCloudOn } from "react-icons/ci";
import { IoCloudyNightSharp } from "react-icons/io5";
import { MdOutlineNightlightRound } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { GiSunCloud } from "react-icons/gi";
import { FaCloudSunRain } from "react-icons/fa";
import { FaCloudMoonRain } from "react-icons/fa";
import { FaCloudShowersWater } from "react-icons/fa6";
import { MdThunderstorm } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiFog } from "react-icons/wi";
import { BsCloudFog2Fill } from "react-icons/bs";
const Weather = () => {

    const getDayName = (timestamp) => {
        const date = new Date(timestamp * 1000); // convert to ms
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const inputRef = useRef(null)
    const [weatherData, setWeatherData] = useState(false);
    const [forecastData, setForecastData] = useState([])
    const allIcon = {
        '01d': <GoSun size={100} className=' my-10 mx-0  w-80 text-yellow-500' />,
        '01n': <MdOutlineNightlightRound size={100} className='my-10 mx-0  w-80 ' />,
        '02d': <CiCloudSun size={100} className='my-10 mx-0  w-80 ' />,
        '02n': <IoCloudyNightSharp size={100} className='my-10 mx-0  w-80 ' />,
        '03d': <CiCloudOn size={100} className='my-10 mx-0  w-80 ' />,
        '03n': < FaCloud size={100} className='my-10 mx-0  w-80 ' />,
        '04d': <GiSunCloud size={100} className='my-10 mx-0  w-80 ' />,
        '04n': < GiSunCloud size={100} className='my-10 mx-0  w-80 ' />,
        '10d': < FaCloudSunRain size={100} className='my-10 mx-0  w-80 ' />,
        '10n': < FaCloudMoonRain size={100} className='my-10 mx-0  w-80 ' />,
        '09d': < FaCloudShowersWater size={100} className='my-10 mx-0  w-80 ' />,
        '09n': < FaCloudShowersWater size={100} className='my-10 mx-0  w-80 text-white ' />,
        '11d': < MdThunderstorm size={100} className='my-10 mx-0  w-80 ' />,
        '11n': < MdThunderstorm size={100} className='my-10 mx-0  w-80 ' />,
        '13d': < FaRegSnowflake size={100} className='my-10 mx-0  w-80 ' />,
        '13n': < FaRegSnowflake size={100} className='my-10 mx-0  w-80 ' />,
        '50d': < WiFog size={100} className='my-10 mx-0  w-80 ' />,
        '50n': < BsCloudFog2Fill size={100} className='my-10 mx-0  w-80 ' />
    }
    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert("city not found")
            }
            console.log(data);

            const icon = allIcon[data.weather[0].icon] || <GoSun size={50} />;
            setWeatherData({
                humidity: data.main.humidity,
                speed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                day: getDayName(data.dt),
                pressure: data.main.pressure
            })

        } catch (error) {

        }
    }

    const forecast = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            console.log(data)
            // allIcon[firstForecast.weather[0].icon] || <GoSun size={50} />;

            setForecastData(
                data.list.map((item) => ({
                    id: item.dt, // unique id from API
                    day: getDayName(item.dt),
                    temp: Math.floor(item.main.temp),
                    time: item.dt_txt.slice(11, 16),
                    humidity: item.main.humidity,

                }))
            );

        } catch (error) {

        }
    }

    const searchByCoords = async (lat, lon) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                throw new Error("location not found");
            }
            const icon = allIcon[data.weather[0].icon] || <GoSun size={50} />;
            setWeatherData({
                humidity: data.main.humidity,
                speed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                day: getDayName(data.dt),
                pressure: data.main.pressure
            });
        } catch (error) {
            // fall back to default city if geolocation fails
            search("cambodia");
        }
    };

    const forecastByCoords = async (lat, lon) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                throw new Error("forecast not found");
            }
            setForecastData(
                data.list.map((item) => ({
                    id: item.dt,
                    day: getDayName(item.dt),
                    temp: Math.floor(item.main.temp),
                    time: item.dt_txt.slice(11, 16),
                    humidity: item.main.humidity,
                }))
            );
        } catch (error) {
            forecast("cambodia");
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    searchByCoords(latitude, longitude);
                    forecastByCoords(latitude, longitude);
                },
                () => {
                    search("cambodia");
                    forecast("cambodia");
                }
            );
        } else {
            search("cambodia");
            forecast("cambodia");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className=' place-self-center p-10 rounded-2xl  bg-blue-800/50 flex items-center flex-col  '>
            <div className='flex flex-row items-center gap-3 justify-center '>
                <input className='border-0 bg-white outline-0 rounded-xl pl-3 font-grey text-xl h-12'
                    type="text" name="" id=""
                    placeholder='Search'
                    ref={inputRef} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search(inputRef.current.value),
                                forecast(inputRef.current.value);
                        }
                    }} />

                <CiSearch size={50} className='text-gray-700 bg-white rounded-full p-3 w-[50px] cursor-pointer'
                    onClick={() => search(inputRef.current.value, forecast(inputRef.current.value))}
                />

            </div>
            <div className='text-center items-center '>
                {weatherData.icon}
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
            <div className="w-full  rounded-2xl ">
                <div className="text-white overflow-x-auto py-4" style={{ maxWidth: '330px' }}>
                    <div className="flex gap-6 min-w-max pb-2 mx-4">
                        {forecastData.map(item => (
                            <div key={item.id} className="shrink-0 w-32 p-4 bg-blue-700/80 rounded-xl text-center">
                                <p className="text-sm font-medium">{item.day}</p>
                                <p className="text-2xl font-bold">{item.temp}°C</p>
                                <div className="flex items-center justify-center gap-1 my-1">
                                    <WiHumidity size={18} />
                                    <p className="text-sm">{item.humidity}%</p>
                                </div>
                                <p className="text-sm">{item.time}</p>
                           
                            </div>
                        ))}
                    </div>
                </div>




            </div>
        </div>
    )
}

export default Weather

