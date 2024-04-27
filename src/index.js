let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", showSearch);
function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-text");
  findCity(searchInput.value);
}
function findCity(city) {
  let apiKey = "6d0cfo306t4a80c23b5feedc0cb2260c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
function updateWeather(response) {
  let temperatureElement = document.querySelector("#figure");
  let figure = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(figure);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#weather");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  getForecast(response.data.city);
}
let currentDateELement = document.querySelector("#time");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
findCity("Berlin");

function updateDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#meteo-forecast");

  let forecastHTML = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="meteo-day">${updateDate(day.time)}</div>
          <div >
          <img src="${day.condition.icon_url}" class="meteo-icon"/></div>
                   <div class="range">
            <span class="meteo-max">${Math.round(
              day.temperature.maximum
            )}° </span>
            <span class="meteo-min"> ${Math.round(
              day.temperature.minimum
            )}°</span>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "6d0cfo306t4a80c23b5feedc0cb2260c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
