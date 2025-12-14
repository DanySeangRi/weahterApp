import React from 'react'
import './App.css'
import  {Weather}  from './components'
import sky from "./assets/sky.png";
const App = () => {
  return (
    <div
    className="h-screen grid place-items-center bg-cover bg-center"
    style={{ backgroundImage: `url(${sky})` }}>
     <Weather/>
    </div>
  )
}

export default App