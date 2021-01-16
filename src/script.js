
// write your code here

let currentHour = document.querySelector("#current-hour");
let currentDay = document.querySelector("#current-day");

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let time= new Date();
let minutes= addZero(time.getMinutes());
let hours=time.getHours();
currentHour.innerHTML= `Updated: ${hours}:${minutes}`;

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

console.log(time.getDay()+1);

function showTemperatureMilan(response){
    console.log(response.data.main.temp);
    let temperatureElement= document.querySelector("#temperature");
    let cityElement= document.querySelector("#name-searched");
    let descriptionElement= document.querySelector("#weather-description");
    let maxTemperatureElement= document.querySelector("#temp-max");
    let minTemperatureElement= document.querySelector("#temp-min");
    let windElement= document.querySelector("#wind");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    maxTemperatureElement.innerHTML=Math.round(response.data.main.temp_max);
    minTemperatureElement.innerHTML=Math.round(response.data.main.temp_min);
    windElement.innerHTML=Math.round(response.data.wind.speed);
}

let apiKey="ca83b4336e75948497b41c37ff204aba";
let apiUrlCity="https://api.openweathermap.org/data/2.5/weather?q=";

axios.get(`${apiUrlCity}Milan&appid=${apiKey}&units=metric`).then(showTemperatureMilan);


function showTemperature (response){
  console.log(response.data);
  console.log(response.data.main.temp);

  let nameSearched= document.querySelector("#name-searched");
  nameSearched.innerHTML=response.data.name;

  let temperatureRounded=Math.round(response.data.main.temp);
  let temperatureElement= document.querySelector("#temperature");
  temperatureElement.innerHTML=temperatureRounded;

  let temperatureMinRounded=Math.round(response.data.main.temp_min);
  let temperatureMaxRounded=Math.round(response.data.main.temp_max);

  let temperatureMinElement= document.querySelector("#temp-min");
  temperatureMinElement.innerHTML=temperatureMinRounded;
   let temperatureMaxElement= document.querySelector("#temp-max");
    temperatureMaxElement.innerHTML=temperatureMaxRounded;

    console.log(response.data.weather[0].description);
    let weatherDescriptionElement= response.data.weather[0].description;
    let weatherDescription= document.querySelector("#weather-description");
    weatherDescription.innerHTML= weatherDescriptionElement;

    let windElement= document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
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

}   

form.addEventListener("submit", search);
//bonus

function fahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  let temperature= temperatureElement.innerHTML;
  temperature= Number(temperature);
  temperatureElement.innerHTML= Math.round((temperature*9)/5 + 32);
}


function celsiusTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  let temperature= temperatureElement.innerHTML;
  temperature= Number(temperature);
  if (temperature===25){
    temperatureElement.innerHTML=25;
  }
  else{
    temperatureElement.innerHTML= Math.round((temperature - 32)*5/9);
  }
  
}



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

  let temperatureMinRounded=Math.round(response.data.main.temp_min);
  let temperatureMaxRounded=Math.round(response.data.main.temp_max);

  let temperatureMinElement= document.querySelector("#temp-min");
  temperatureMinElement.innerHTML=temperatureMinRounded;
   let temperatureMaxElement= document.querySelector("#temp-max");
    temperatureMaxElement.innerHTML=temperatureMaxRounded;

    console.log(response.data.weather[0].description);
    let weatherDescriptionElement= response.data.weather[0].description;
    let weatherDescription= document.querySelector("#weather-description");
    weatherDescription.innerHTML= weatherDescriptionElement;

    let windElement= document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
}

function showPosition(position){
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude= position.coords.latitude;
  let longitude=position.coords.longitude; 

  let apiKey="ca83b4336e75948497b41c37ff204aba";
  let apiUrlCity="https://api.openweathermap.org/data/2.5/weather?";

  axios.get(`${apiUrlCity}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then(showCurrentCityTemperature);

}

function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity= document.querySelector("#currentCity");
currentCity.addEventListener("click", getCurrentPosition);



