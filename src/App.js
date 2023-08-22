import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const APIKey = "dd6cdc925511d17fb8d0f7ce3f3a2b85";
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [zip, setZIP] = useState("");
  const [country, setCountry] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`;
  const zipURL=` https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${APIKey}`;
  const  searchLocation = async (event) =>
  {
    if(event.key === "Enter")
    {
      await axios.get(url).then((response)=>{
        setWeatherData(response.data)
      })
      console.log(weatherData)
      setLocation("")
     
    }
   
  }
  const  searchZIP = async (event) =>
  {
    if(event.key === "Enter")
    {
      await axios.get(zipURL).then((response)=>{
        setWeatherData(response.data)
      })
      console.log(weatherData)
      setZIP("")
      setCountry("")
    }
   
  }
  const currentTemp = Math.floor(weatherData?.main?.temp - 273.15) ;
  const feelsLike = Math.floor(weatherData?.main?.feels_like - 273.15);
  const humidity = Math.floor(weatherData?.main?.humidity/10);
  // const [weather] = weatherData?.weather;
  // const description = weather?.description;
  
  return (
    <div className="relative w-full overflow-clip">
      <h1 className='text-center m-6 text-4xl underline underline-offset-2 italic '>Weather App</h1>
      <div className=' flex flex-row justify-center my-auto'>
         <div className='search-field location'>
              <h2>Search by City</h2>
               <input 
               className='input-field'
                value={location}
                 onChange={e=>setLocation(e.target.value)} 
                 onKeyDown={searchLocation}
                 placeholder='Enter city'
                 type="text"/>
         </div>
          
          <div className='search-field zip-code flex flex-col'>
              <h2>Search by ZIP Code</h2>
                <input 
                className='input-field'
                value={zip}
                onChange={e=>setZIP(e.target.value)} 
                placeholder='Enter ZIP Code'
                type="text"/>
      
                <input 
                className='input-field'
                value={country}
                onChange={e=>setCountry(e.target.value)} 
                onKeyDown={searchZIP}
                placeholder='Enter country code'
                type="text"/>
          </div>

      </div>
      <div className='capitalize flex flex-col mt-5 items-center
       mx-auto bg-stone-700 w-fit p-8 bg-opacity-60 
       rounded-md shadow-md'>

       <h3 className='text-[2rem]'>
        {weatherData?.name === undefined ? "Search weather" : "Weather in " + weatherData?.name + ":"}
        </h3>
          <h4 className='italic text-[1.5rem]'>{weatherData?.name === undefined ? "Press Enter" : null}</h4>
          <div className='info'>
              {weatherData?.main ? <p>{"Temp: "+currentTemp+"°C"}</p> : " "}
              {weatherData?.main ? <p>{"Feels Like: "+feelsLike+"°C"}</p> : " "}
              {weatherData?.main ? <p>{"Humidity: "+humidity+"%"}</p> : " "}
              {/* { weatherData?.weather !== undefined ? <p>{description}</p> : " "} */}
          </div>
      </div>
    </div>
  );
}

export default App;
