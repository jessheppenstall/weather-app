let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
let min = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
let amPm = now.getHours() >= 12 ? "PM" : "AM";
let currentTime = `${hour}:${min} ${amPm}`;
document.querySelector("#current-day-time").innerHTML = `${
  days[now.getDay()]
} | ${currentTime}`;

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}

function search(city) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = "6e2f14a60b2f5be57b160a6148235b2f";
  let units = "imperial";
  let cityApiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(cityApiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  console.log(response.data);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6e2f14a60b2f5be57b160a6148235b2f";
  let units = "imperial";
  let currentLocationApiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(currentLocationApiUrl).then(displayWeather);
}

search("Seattle");

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
document
  .querySelector("#current-city-button")
  .addEventListener("click", getCurrentPosition);
