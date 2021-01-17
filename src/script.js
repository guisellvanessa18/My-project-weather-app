
// write your code here

let currentDay = document.querySelector("#current-day");

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let time= new Date();
let week= [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
let day =week[time.getDay()];
currentDay.innerHTML=day;

function formatDate(timestamp){
    //calculate the hour
    let date=new Date(timestamp);
    let hours= date.getHours();
    let minutes=date.getMinutes();
    if (hours< 10){
        hours=`0${hours}`;
    }
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function displayForecast(response){
    console.log(response.data.main);
    let forecastElement= document.querySelector("#forecast");
}

function showTemperatureMilan(response){
    
    let temperatureElement= document.querySelector("#temperature");
    let cityElement= document.querySelector("#name-searched");
    let descriptionElement= document.querySelector("#weather-description");
    let maxTemperatureElement= document.querySelector("#temp-max");
    let minTemperatureElement= document.querySelector("#temp-min");
    let windElement= document.querySelector("#wind");
    let iconElement=document.querySelector("#icon");
    let currentHourElement = document.querySelector("#current-hour");
    celsiusTemperature= response.data.main.temp;

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    maxTemperatureElement.innerHTML=Math.round(response.data.main.temp_max);
    minTemperatureElement.innerHTML=Math.round(response.data.main.temp_min);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentHourElement.innerHTML= formatDate(response.data.dt*1000); 
}

let apiKey="ca83b4336e75948497b41c37ff204aba";
let apiUrlCity="https://api.openweathermap.org/data/2.5/weather?q=";
axios.get(`${apiUrlCity}Milan&appid=${apiKey}&units=metric`).then(showTemperatureMilan);

apiUrlCity="https://api.openweathermap.org/data/2.5/forecast?q=";
axios.get(`${apiUrlCity}Milan&appid=${apiKey}&units=metric`).then(displayForecast);


function showTemperature (response){

  let nameSearched= document.querySelector("#name-searched");
  nameSearched.innerHTML=response.data.name;

  celsiusTemperature= response.data.main.temp;

  let temperatureRounded=Math.round(response.data.main.temp);
  let temperatureElement= document.querySelector("#temperature");
  temperatureElement.innerHTML=temperatureRounded;

  let temperatureMinRounded=Math.round(response.data.main.temp_min);
  let temperatureMaxRounded=Math.round(response.data.main.temp_max);

  let temperatureMinElement= document.querySelector("#temp-min");
  temperatureMinElement.innerHTML=temperatureMinRounded;
   let temperatureMaxElement= document.querySelector("#temp-max");
    temperatureMaxElement.innerHTML=temperatureMaxRounded;

    let weatherDescriptionElement= response.data.weather[0].description;
    let weatherDescription= document.querySelector("#weather-description");
    weatherDescription.innerHTML= weatherDescriptionElement;

    let windElement= document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);

    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    let currentHourElement = document.querySelector("#current-hour");
    currentHourElement.innerHTML= formatDate(response.data.dt*1000); 
}

let form = document.querySelector("#search-form");
function search(event){
  event.preventDefault();
  let searchCity =document.querySelector("#search-text-city");
  let nameSearched= document.querySelector("#name-searched");
  nameSearched.innerHTML=`${searchCity.value}`;

  let apiKey="ca83b4336e75948497b41c37ff204aba";
  let apiUrlCity="https://api.openweathermap.org/data/2.5/weather?q=";

  axios.get(`${apiUrlCity}${searchCity.value}&appid=${apiKey}&units=metric`).then(showTemperature);

  apiUrlCity="https://api.openweathermap.org/data/2.5/forecast?q=";
  axios.get(`${apiUrlCity}${searchCity.value}&appid=${apiKey}&units=metric`).then(displayForecast);

}   

form.addEventListener("submit", search);
//bonus

function fahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML= Math.round((celsiusTemperature*9)/5 + 32);
}


function celsiusTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusTemperature= null;
let temperature= document.querySelector("#temperature");
let fahrenheit=document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemp);
let celsius= document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemp);


function showCurrentCityTemperature (response){
  console.log(response.data);
  let temperatureRounded=Math.round(response.data.main.temp);
  let temperatureElement= document.querySelector("#temperature");
  temperatureElement.innerHTML=temperatureRounded;
  let currentCityName= document.querySelector("#name-searched");
  currentCityName.innerHTML=response.data.name;
  celsiusTemperature= response.data.main.temp;

  let temperatureMinRounded=Math.round(response.data.main.temp_min);
  let temperatureMaxRounded=Math.round(response.data.main.temp_max);

  let temperatureMinElement= document.querySelector("#temp-min");
  temperatureMinElement.innerHTML=temperatureMinRounded;
  let temperatureMaxElement= document.querySelector("#temp-max");
  temperatureMaxElement.innerHTML=temperatureMaxRounded;

  let weatherDescriptionElement= response.data.weather[0].description;
  let weatherDescription= document.querySelector("#weather-description");
  weatherDescription.innerHTML= weatherDescriptionElement;
  let windElement= document.querySelector("#wind");
  windElement.innerHTML=Math.round(response.data.wind.speed);

  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let currentHourElement = document.querySelector("#current-hour");
  currentHourElement.innerHTML= formatDate(response.data.dt*1000); 
}

function showPosition(position){

  let latitude= position.coords.latitude;
  let longitude=position.coords.longitude; 

  let apiKey="ca83b4336e75948497b41c37ff204aba";
  let apiUrlCity="https://api.openweathermap.org/data/2.5/weather?";

  axios.get(`${apiUrlCity}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then(showCurrentCityTemperature);

  apiUrlCity="https://api.openweathermap.org/data/2.5/forecast?q=";
  axios.get(`${apiUrlCity}${searchCity.value}&appid=${apiKey}&units=metric`).then(displayForecast);
}

function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity= document.querySelector("#currentCity");
currentCity.addEventListener("click", getCurrentPosition);



