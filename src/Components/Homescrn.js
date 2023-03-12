import React,{useEffect, useState} from 'react';
import { FaSun } from "react-icons/fa";
import { WiCelsius } from "react-icons/wi";
import {BsFillSunFill,BsFillCloudRainFill,BsFillCloudHaze2Fill,BsArrowDownShort,BsCloudSunFill} from 'react-icons/bs';
import {AiFillFacebook,AiFillInstagram,AiFillTwitterCircle} from 'react-icons/ai'
import useGetCurrentWeather from '../ApiServices';
import axios from 'axios';
import moment from 'moment';

const kelvin = 273.15;


 function HomeScrn (){
   const {currentLocation,currentTemp} = useGetCurrentWeather();
   const [query, setQuery] = useState("");
   const [error, setError] = useState("");
   const [weather, setWeather] = useState(null);
   const[cityName,setCityName] = useState("")
   const [isError,setIsError] = useState(false)
 

  const search = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c2c0af5ecc909896217bafebb1a9c5f5`
      )                                                                   
      .then((response) => {
        setWeather(response.data);      
        setIsError(false)                           
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather({});
        setIsError(true)
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };
  
   useEffect(() =>{
    {currentLocation?search(currentLocation):search("chennai")}
   },[])

const getInpitValue = (txt) =>{
    setCityName(txt)
}

    return(
        <div name="app-content">
           <div name="content-body" style={{position:"relative",background:"#F0F0F0"}}>
            <div name="header-holdr" style={{position:"sticky",top:0}}>
                <div name="header"  style={styles.headerStyle}>
                    <div name="header-body" style={{display:'flex',flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
                        <div name="app-name">
                           <div style={{display:"flex",flexDirection:'row',alignItems:'center',justifyContent:"center"}}>
                             <FaSun style={{color:"rgb(240, 85, 20)",paddingRight:5}} size={30}/>
                            <h2 style={styles.appName}>Weather App</h2>
                           </div>
                        </div>
                        <div name="current-lctn" style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
                             <h3 style={{padding:0,paddingLeft:"10px",color:"#fff"}}>{currentLocation}</h3>
                             <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:'row'}}>
                             <h4 style={{padding:0,paddingLeft:"10px",color:"#fff"}}>{Math.round(currentTemp)}</h4>
                             <WiCelsius size={30} style={{padding:"0px",marginLeft:-10}} color={"#fff"}></WiCelsius>
                            { currentTemp >25?<BsFillSunFill size={20} style={{padding:"0px",marginLeft:5}} color={"yellow"}></BsFillSunFill>:<></>}
                            { currentTemp <25?<BsFillCloudHaze2Fill size={20} style={{padding:"0px",marginLeft:5}} color={"#fff"}></BsFillCloudHaze2Fill>:<></>}
                             </div>
                        </div>
                        <div name="search-bar" style={{paddingLeft:"20px"}}>
                            <div style={{flexDirection:"row",display:"flex",justifyContent:"center"}}>
                                <input type={"text"} placeholder={"city"} style={{border:'solid 1px white',outline:"none",height:20}} value={cityName} onChange={(e)=>{getInpitValue(e.target.value)}}/>
                                <button style={{height:24.5}} onClick={() =>{search(cityName)}}>search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isError&& <div style={{paddingTop:30,paddingBottom:30}}>
                <img src={require('../Assets/noresults.png')} alt="Flowers in Chania" width="400" height="400"></img>
                <h1>No Results Found</h1>
                </div>}
            {weather && !isError && <div name="content" style={{height:window.innerHeight,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                      <div style={styles.daysWetherContent}>
                        <div style={{borderBottom:"1px solid #d9d9d9"}} name="content-header">
                            <div style={{display:"flex",flexDirection:'row',}}>
                                <div style={styles.contentHdr}>
                                  <p style={styles.contentHdrTxt}>Current Weather</p>
                                </div>
                                <div style={{display:"flex",flex:1,justifyContent:'flex-end',alignItems:"center",padding:0}}>
                                    <p style={styles.contentHdrTxt}>{moment(new Date()).format('dddd MMMM Do YYYY')}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{display:"flex",flexDirection:'row'}} name="rw1">
                            <div style={{flex:1,alignItems:"flex-start"}}>
                                <div style={styles.weatherContent}>
                                   <div style={styles.weatherIconHldr}>
                                   {Math.round(weather.main.temp_min-kelvin)>25?<BsFillSunFill size={60} style={{padding:"0px",textAlign:'left'}} color={"rgb(240, 85, 20)"}></BsFillSunFill>:<></>}
                                   {Math.round(weather.main.temp_min-kelvin)<25?<BsCloudSunFill size={60} style={{padding:"0px",textAlign:'left'}} color={"rgb(240, 85, 20)"}></BsCloudSunFill>:<></>}
                                      <div style={{display:"flex",alignItems:"center",paddingLeft:20}}>
                                        <p style={{padding:0,margin:0,fontSize:40}}>{Math.round(weather.main.temp-kelvin)}</p>
                                       <WiCelsius size={30} style={{padding:"0px",marginLeft:-10}} color={"#000"}></WiCelsius>
                                      </div>
                                    </div> 
                                </div>
                            </div>
                            <div style={styles.humadityContent}>
                               <div>
                             <div style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
                             <p style={{padding:0,margin:0,paddingBottom:8,fontSize:16}}>Feels Like {Math.round(weather.main.feels_like-kelvin)}</p>
                                <WiCelsius size={30} style={{padding:"0px",marginLeft:-8,marginTop:-10}} color={"#000"}></WiCelsius>
                             </div>
                             <div style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
                             <p style={{padding:0,margin:0,paddingBottom:8,fontSize:16}}>Real feels {Math.round(weather.main.feels_like-kelvin)}</p>
                                <WiCelsius size={30} style={{padding:"0px",marginLeft:-8,marginTop:-10}} color={"#000"}></WiCelsius>
                             </div>
                               </div>
                            </div>
                        </div>
                        <p style={styles.weatherTxt}>{weather.weather[0].description}</p>
                        <div name="grid-view" style={{paddingBottom:25}}>
                          <div name="rw1" style={{flexDirection:"row",display:'flex',paddingTop:10,paddingBottom:10}}>
                            
                            <div name="col1" style={styles.dataColumn}>
                            <div style={{display:'flex',flex:1}}>
                                <p style={{margin:0}}>Min Temperature</p>
                            </div>
                            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                            <div style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
                                <p  style={{margin:0}}>{Math.round(weather.main.temp_min-kelvin)}</p>
                                <WiCelsius size={30} style={{padding:"0px",marginLeft:-8,marginTop:-10}} color={"#000"}></WiCelsius>
                            </div>
                            </div>
                            </div>

                            <div name="col2" style={styles.dataColumn}>
                            <div style={{display:'flex',flex:1}}>
                                <p  style={{margin:0,marginBottom:10}}>Humadity</p>
                            </div>
                            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                                <p  style={{margin:0,marginBottom:10}}>{weather.main.humidity}%</p>
                            </div>
                            </div>
                          </div>

                          <div name="rw1" style={{flexDirection:"row",display:'flex',paddingTop:10,paddingBottom:10}}>
                            
                            <div name="col1" style={styles.dataColumn}>
                            <div style={{display:'flex',flex:1}}>
                                <p style={{margin:0}}>Max Temperature</p>
                            </div>
                            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                            <div style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
                                <p  style={{margin:0}}>{Math.round(weather.main.temp_max-kelvin)}</p>
                                <WiCelsius size={30} style={{padding:"0px",marginLeft:-8,marginTop:-10}} color={"#000"}></WiCelsius>
                            </div>
                            </div>
                            </div>

                            <div name="col2" style={styles.dataColumn}>
                            <div style={{display:'flex',flex:1}}>
                                <p  style={{margin:0,marginBottom:10}}>Visibility</p>
                            </div>
                            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                                <p  style={{margin:0,marginBottom:10}}>{weather.visibility/1000} km</p>
                            </div>
                            </div>
                          </div>
                          <div name="rw1" style={{flexDirection:"row",display:'flex',paddingTop:10,paddingBottom:10}}>
                            
                            <div name="col1" style={styles.dataColumn}>
                            <div style={{display:'flex',flex:1}}>
                                <p style={{margin:0}}>Pressure</p>
                            </div>
                            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                                <div style={{display:"flex",flexDirection:'row'}}>
                                <p  style={{margin:0}}>{weather.main.pressure}</p>
                                <BsArrowDownShort size={15}></BsArrowDownShort>
                                </div>
                            </div>
                            </div>

                            <div name="col2" style={styles.dataColumn}>
                            <div style={{display:'flex',flex:1}}>
                                <p  style={{margin:0,marginBottom:10}}>Wind speed</p>
                            </div>
                            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-end'}}>
                                <p  style={{margin:0,marginBottom:10}}>{Math.round(weather.wind.speed)} KMPH</p>
                            </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      
                </div>
            </div>}
            <div name="footer" style={{backgroundColor:"#36454F"}}>
              <div name="footer-content" style={{width:"80%",margin:"auto",padding:0,display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                <div name="col-1" >
                    <p style={{textAlign:"left",fontSize:17,color:"#FAF9F6",paddingBottom:15}}>COMPANY</p>
                    <p style={styles.footerTxt}>Proven Superior Accuracy</p>
                    <p style={styles.footerTxt}>About AccuWeather</p>
                    <p style={styles.footerTxt}>Digital Advertising</p>
                    <p style={styles.footerTxt}>Careers</p>
                    <p style={styles.footerTxt}>Press</p>
                    <p style={styles.footerTxt}>Contact US</p>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",paddingTop:20}}>
                      <AiFillFacebook style={{background:"#fff",paddingRight:10}} size={20} color={"#3b5998"} ></AiFillFacebook>
                      <AiFillInstagram style={{background:"#fff",paddingRight:10}} size={20} color={"#962fbf"}></AiFillInstagram>
                      <AiFillTwitterCircle style={{background:"#fff",paddingRight:10}} size={20} color={"rgb(29, 161, 242)"}></AiFillTwitterCircle>
                    </div>
                </div>
                <div name="col-2" >
                <p style={{textAlign:"left",fontSize:17,color:"#FAF9F6",paddingBottom:15}}>PRODUCTS & SERVICES</p>
                    <p style={styles.footerTxt}>For Business</p>
                    <p style={styles.footerTxt}>For Partners</p>
                    <p style={styles.footerTxt}>For Advertising</p>
                    <p style={styles.footerTxt}>AccuWeather APIs</p>
                    <p style={styles.footerTxt}>Podcast</p>
                    <p style={styles.footerTxt}>RealFeel® and RealFeel Shade™</p>
                </div>

                <div name="col-3" >
                <p style={{textAlign:"left",fontSize:17,color:"#FAF9F6",paddingBottom:15}}>APPS & DOWNLOADS</p>
                    <p style={styles.footerTxt}>iPhone App</p>
                    <p style={styles.footerTxt}>Android App</p>
                    <p style={styles.footerTxt}>See all Apps & Downloads</p>
                    <p style={styles.footerTxt}>SUBSCRIPTION SERVICES</p>
                    <p style={styles.footerTxt}>AccuWeather Premium</p>
                    <p style={styles.footerTxt}>AccuWeather Professional</p>
                </div>
                <div name="col-4" >
                <p style={{textAlign:"left",fontSize:17,color:"#FAF9F6",paddingBottom:15}}>More</p>
                    <p style={styles.footerTxt}>Business</p>
                    <p style={styles.footerTxt}>Health</p>
                    <p style={styles.footerTxt}>Hurricane</p>
                    <p style={styles.footerTxt}>Leisure and Recreation</p>
                    <p style={styles.footerTxt}>Severe Weather</p>
                    <p style={styles.footerTxt}>Space and Astronomy</p>
                    <p style={styles.footerTxt}>Sports</p>
                    <p style={styles.footerTxt}>Travel</p>
                    <p style={styles.footerTxt}>Weather News</p>
                </div>

              </div>
            </div>
           </div>
        </div>
    )
}

const styles = {
    headerStyle:{
        width:"100%",
        border:"solid 1px black",
        backgroundColor:"#1f1f1f",
    },
    appName:{
        color:"#fff",
        padding:0,
        margin:0
    },
    daysWetherContent:{
        width:"700px",
        padding:10,
        backgroundColor:"#fff"
    },
    contentHdr:{
        display:"flex",
        flex:1,
        justifyContent:'flex-start',
        alignItems:"center",
      
    },
    contentHdrTxt:{
        fontSize:15,
        paddingTop:10,
        paddingBottom:10,
        margin:0
    },
    weatherContent:{
        display:"flex",
        flex:1,
        justifyContent:'flex-start',
        alignItems:"center",
        padding:0,
        paddingLeft:25,
        paddingTop:30
    },
    weatherIconHldr:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    humadityContent:{
        display:"flex",
        flex:1,
        justifyContent:'center'
        ,alignItems:"center",
        padding:0,
        paddingTop:30
    },
    weatherTxt:{
        color:"#000",
        textAlign:"left"
        ,paddingLeft:25,
        fontWeight:'bolder',
        fontSize:18
    },
    dataColumn:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        borderBottom:"solid 1px gray",
        margin:10
    },
    innerDtaColumn:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'flex-end'
    },
    footerTxt:{
    textAlign:'left',
    color:"#E2DFD2"
    }
}

export default HomeScrn;
