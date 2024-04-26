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

findCity("Paris");
