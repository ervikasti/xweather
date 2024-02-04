
import axios from 'axios';
import { useState } from 'react';

function App() {


  const [data,setData] = useState('');
  const [cityData,setCityData] = useState(null);
  const [isLoading,setIsLoading] =useState(false);

  const handleChange =(e)=>{
    // set the data
    setData(e.target.value);
    setIsLoading(false);
  }

  const handleSearch =  () =>{

   
    if(data){
      setIsLoading(true);
      // console.log(isLoading);
      let api = `https://api.weatherapi.com/v1/current.json`;

        
        axios.get(`${api}`,{
          params : {key : 'e1c6a2fbc610443cb6f103429232811',
          q: data},
        })
        .then( (response) => {
          setCityData(response.data);
          setIsLoading(false);
        })
        .catch( (error) => {console.error(error);
        alert("Failed to fetch weather data")})    
    }
     
    console.log(cityData);
          
  }

  return (
    <div>
      <input type='text'  onChange={handleChange} value={data}/>
      <button onClick={handleSearch}>Search</button>

      {isLoading ? <p>Loading data ...</p>: 
      <>
      {cityData ?
      <div> 
        <div className='weather-card'>
          <h2>Temperature</h2>
          <p>{cityData.current.temp_c} C</p>
        </div>
        <div className='weather-card'>
          <h2>Humidity</h2>
          <p>{cityData.current.humidity} %</p>
        </div>
        <div className='weather-card'>
          <h2>Condition</h2>
          <p>{cityData.current.condition.text}</p>
        </div>
        <div className='weather-card'>
          <h2>Wind Speed</h2>
          <p>{cityData.current.wind_kph} kph</p>
        </div>
      </div>
       : null}</>}
    </div>
  );
}

export default App;
