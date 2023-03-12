
import axios from 'axios';
import React,{useEffect,useState} from 'react';


const getMyLocation =async () =>{
 
    const prmis = new Promise(function(res,rej){
        const location = window.navigator && window.navigator.geolocation
        if (location) {
          location.getCurrentPosition((position) => {
          res(position)
           
          }, (error) => {
            rej(error)
          })
        }
    })
return prmis;
   
  }

const useGetCurrentWeather = () =>{
    const[currentLocation,setCurrentLoaction] = useState('');
    const[currentTemp,setCurrentTemp] = useState('');
    
      useEffect(()=>{
        getMyLocation().then(position =>{
            const options = {
                method: 'GET',
                url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
                params: {lat: position.coords.latitude, lon: position.coords.longitude},
                headers: {
                  'X-RapidAPI-Key': 'c32f829eabmsh798ad14b48a556ap121424jsn680e41e4bb13',
                  'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                  console.log(response.data);
                  setCurrentLoaction(response.data.city_name);
                setCurrentTemp(response.data.data[0].temp)
              }).catch(function (error) {
                  console.error(error);
              });
        })
      
      },[])

      return {currentLocation:currentLocation,currentTemp:currentTemp}
}



export default useGetCurrentWeather;