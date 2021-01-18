import React, { useState } from 'react';
const api={
    key:'*****',
    base:"https://api.openweathermap.org/data/2.5/"
}


function App ()
{

const datebuilder=(d) =>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
}

const [query, setQuery]= useState('');
const [weather,setWeather]= useState({});
const search = evt =>{
    if(evt.key==='Enter'){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res =>res.json())
        .then(result =>{
            setWeather(result);
            setQuery('');
            console.log(result);

        })
    }

}

    return(
        <div className={(typeof weather.main != "undefined") ?
        ((weather.main.temp < 5)?
        'app winter':((weather.main.temp<20)?'app':'app warm')):'app'}>
            <main>
                <div className="s-box">
                    <input type="text" className="s-bar" placeholder="Enter a city name to Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
                </div>
                {(typeof weather.main != "undefined")?(
                 <div>   
                    <div className="l-box">
                            <div className="lc">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className="date">
                                {datebuilder(new Date())}
                            </div>
                     </div>

                     <div className="w-box">
                            <div className="temp">
                                {Math.floor(weather.main.temp)}{'\u00b0'} C
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                             </div>
                     </div>
                </div>     
            ):(' ')}       
            </main>
        </div>
    )


}

export default App
