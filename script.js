function getWeather(){
    const apiKey ="20c00865481394332aaa66ee0668263b"  //this is an apikey get from online weather site
    const cityName = document.getElementById("city").value
    if(!cityName){
        alert("Please enter a city name")
        return
    }
const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}` // this is the url of the api

fetch(currentWeatherUrl).then((response)=>{
return response.json()
}).then((data)=>{
displayWeather(data) // this is a function to be called after loading the api data 
}).catch((error)=>{
console.log("error fetching the current weather", error);
alert("Oops... Something went wrong while loading the current weather")
})

}

 function displayWeather(data){
    const weatherIconDiv = document.getElementById("weather-icon")
    const tempInfoDiv = document.getElementById("temp-info")
    const feelsLikeinfoDiv = document.getElementById("feelsLike-info")
    const weatherInfoDiv = document.getElementById("weather-info")
    // this is just to make sure that these elements dont contain nothing
    tempInfoDiv.innerHTML=""
    weatherInfoDiv.innerHTML=""
    feelsLikeinfoDiv.innerHTML=""

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>` // this is to show the error after entereing the city name if any error occurs
    }else{
        const temperature = Math.round(data.main.temp - 273.15) //temperature is in the data.main.temp and it is converted to °C(by -273.15) and round off to integer
        const feelsLike = Math.round(data.main.feels_like - 273.15)
        const humidity = data.main.humidity
        const cityName = data.name // name of the city is in the data.name
        const description = data.weather[0].description // weather description is in the data.weather[0].description
        const iconCode = data.weather[0].icon // weather icon is in the data.weather[0].icon
        const iconUrl =`https://openweathermap.org/img/wn/${iconCode}.png` // image is loaded according to the weather icon
        const temperatureHTML = `<p>${temperature}°C</p>` // temperature is then converted to this form  and stored in the temperatureHTML
        const feelsLikeHTML = `<p>Feels Like:${feelsLike}°C</p> Humidity:${humidity}km/hr</p>`
        const descriptionHTML = `<p class="city-weather">${cityName}</p>  
        <p>${description}</p>` // cityname and description also converted and stored in descriptionHTML
    
        tempInfoDiv.innerHTML=temperatureHTML //this temperatureHTML is then added to tempInfoDiv.innerHTML which was nill 
        feelsLikeinfoDiv.innerHTML=feelsLikeHTML // this feelsLikeHTML is then added to feelsLikeinfoDiv.innerHTML which was nill
        weatherInfoDiv.innerHTML=descriptionHTML //this descriptionHTML is then added to weatherInfoDiv.innerHTML which was nill
        weatherIconDiv.src= iconUrl //this iconUrl is then added to weatherIconDiv.src which was nill
        weatherIconDiv.alt= description //this description is then added to weatherIconDiv.alt which was nill
    }
    showImage() // a function is called
 }
 function showImage(){
     const weatherIcon = document.getElementById("weather-icon")
     weatherIcon.style.display = "block"// this is to display the weathericon image it has been display:none in normal style.css
 }

