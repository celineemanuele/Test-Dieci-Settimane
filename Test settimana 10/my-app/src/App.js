
import React, { useState } from 'react'; 
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFrown } from '@fortawesome/free-solid-svg-icons'; 
import {Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
  
function App() { 
    const [input, setInput] = useState(''); 
    const [weather, setWeather] = useState({ 
        loading: false, 
        data: {}, 
        error: false, 
    }); 
  
    const toDateFunction = () => { 
        const months = [ 
            'January', 
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September', 
            'October', 
            'November', 
            'December', 
        ]; 
        const WeekDays = [ 
            'Sunday', 
            'Monday', 
            'Tuesday', 
            'Wednesday', 
            'Thursday', 
            'Friday', 
            'Saturday', 
        ]; 
        const currentDate = new Date(); 
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()] 
            }`; 
        return date; 
    }; 
  
    const search = async (event) => { 
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            setInput(''); 
            setWeather({ ...weather, loading: true }); 
            const url = 'https://api.openweathermap.org/data/2.5/weather'; 
            const api_key = '89c86defaf2b4c3b8e0ff6c38d02b523'; 
            await axios 
                .get(url, { 
                    params: { 
                        q: input, 
                        units: 'metric', 
                        appid: api_key, 
                    }, 
                }) 
                .then((res) => { 
                    console.log('res', res); 
                    setWeather({ data: res.data, loading: false, error: false }); 
                }) 
                .catch((error) => { 
                    setWeather({ ...weather, data: {}, error: true }); 
                    setInput(''); 
                    console.log('error', error); 
                }); 
        } 
    }; 
  
    return ( 
        <div className="App"> 
            <h1 className="app-name"> 
                 Weather App 
            </h1> 
            <div className="search-bar"> 
                <input 
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={input} 
                    onChange={(event) => setInput(event.target.value)} 
                    onKeyPress={search} 
                /> 
            </div> 
            {weather.loading && ( 
                <> 
                    <br /> 
                    <br /> 
                    <Spinner animation="border" role="status" color="black" height={100} width={100}>
                    </Spinner>
                   
                </> 
            )} 
            {weather.error && ( 
                <> 
                    <br /> 
                    <br /> 
                    <span className="error-message"> 
                        <FontAwesomeIcon icon={faFrown} /> 
                        <span style={{ fontSize: '20px' }}>City not found</span> 
                    </span> 
                </> 
            )} 
            {weather && weather.data && weather.data.main && ( 
                <div> 
                    <div className="city-name"> 
                        <h2> 
                            {weather.data.name}, <span>{weather.data.sys.country}</span> 
                        </h2> 
                    </div> 
                    <div className="date"> 
                        <span>{toDateFunction()}</span> 
                    </div> 
                    <div className="icon-temp"> 
                        <img 
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
                            alt={weather.data.weather[0].description} 
                        /> 
                        {Math.round(weather.data.main.temp)} 
                        <sup className="deg">°C</sup> 
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                    </div> 
                    <div className='Container-Detail'>
                      <div className="Di">
                        <div className="des-wind"> 
                            <p>Wind Speed: {weather.data.wind.speed}m/s</p> 
                            <i class="bi bi-wind"></i>
                        </div> 
                        <div className="humidity"> 
                            <p>Humidity: {weather.data.main.humidity}%</p> 
                        </div> 
                        <div className="pressure"> 
                            <p>Pressure: {weather.data.main.pressure}</p> 
                            <i class="bi bi-thermometer-half"></i>
                        </div>
                        <div className="sunset"> 
                            <p>Sunset: {weather.data.sys.sunset}</p> 
                            <i class="bi bi-sunset"></i>
                        </div>
                        <div className="sunrise"> 
                            <p>Sunrise: {weather.data.sys.sunrise}</p> 
                            <i class="bi bi-sunrise"></i>
                        </div>
                        </div>
                    </div>
                </div> 
            )} 
        </div> 
    ); 
} 
  
export default App;
