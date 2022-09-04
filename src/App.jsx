import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  const[change, setChange]=useState(true)
  const changeScale=()=>{
    setChange(!change)
  }

  const [url, setUrl] = useState({})
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=5b0660ff99ab1982109177a3b0d41476`)
      .then(res => setUrl(res.data) )
    }    
  }, [])

  console.log(url)
const tempK=url?.main?.temp
const tempC=tempK-273.15
const tempF=tempC*9/5+32

  return (
    <div className='Content'>
    <div className="App">
      <div className='Content-1'>
      <div className='Cotent_info'>
      <h1>Today's Weather Forecast</h1>
      <h2>{url?.name}{", "}{url?.sys?.country}</h2>
      <div className='Scale'>
      <h2>{"Temp: "}{change ?tempC.toFixed(2):tempF.toFixed(2)}{change?"°C":"°F"}</h2>
      <button onClick={changeScale}>SCALE {change?"°F":"°C"}</button>
      </div>
      </div>
      <img src={`http://openweathermap.org/img/wn/${url?.weather?.[0].icon}@2x.png`} alt="" />
      </div>
      <div className='Content-2'>
        
          <li>{"Atmospheric Pressure: "}{url?.main?.pressure}{"  hPa"}</li>
          <li>{"Humidity: "}{url?.main?.humidity}{" %"}</li>
          <li>{"Wind speed: "}{url?.wind?.speed}{"  miles/hour."}</li>
          <li>{"Cloudiness: "}{url?.clouds?.all}{" %"}</li>
          <li>{"Wind direction: "}{url?.wind?.deg}{"  degrees"}</li>
          <li>{"Weather: "}{url?.weather?.[0].description}</li>          
        </div>
    </div>
    </div>
  )
}

export default App
