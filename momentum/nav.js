const WEATHER_API_KEY = "ff466680a9e81330bccfdb5d5e011ede";
const COORDS = "coords";
const USERNAME = "username";

const cityText = document.querySelector("nav .left .city");
const tempText = document.querySelector("nav .left .temp");
const humidityText = document.querySelector("nav .left .humidity");
const greetingText = document.querySelector("nav .right .label");
const nameForm = document.querySelector("nav .right form");
const nameText = document.querySelector("form .name");
const resetButton = document.querySelector("nav .right .reset");
const timeText = document.querySelector(".time");

// 위치
function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const {name, main: {humidity, temp} } = data;
      cityText.innerText = `위치: ${name}`;
      tempText.innerText = `현재 온도: ${temp}도`;
      humidityText.innerText = `습도: ${humidity}%`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
      latitude,
      longitude,
  }
  saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can not access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
      askForCoords();
  } else {
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}






// 시계
const getTime = () => {
    const time = new Date();
    const ampm = time.getHours() >= 12 ? "오후" : "오전"
    const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    timeText.innerText = `${ampm} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

const setGreetingText = (text) => {
    greetingText.innerText = `반갑습니다. ${text}님!`;
    nameForm.classList.add("hidden");
}

const saveUserName = (e, text) => {
    e.preventDefault();
    localStorage.setItem(USERNAME, text);
    setGreetingText(text);
    resetButton.classList.remove("hidden");
    nameText.value = "";
}

const resetName = () => {
    localStorage.removeItem(USERNAME);
    greetingText.innerHTML = "이름을 등록해보세요! 👉";
    nameForm.classList.remove("hidden");
    resetButton.classList.add("hidden");
}

const loadUserName = () => {
    const userName = localStorage.getItem(USERNAME);
    if (userName) {
        setGreetingText(userName);
        resetButton.classList.remove("hidden");
    }
}

function init() {
    loadCoords();
    loadUserName();
    setInterval(() => { getTime() }, 1000);

    nameForm.addEventListener("submit", (e) => saveUserName(e, nameText.value));
    resetButton.addEventListener("click", resetName);
}

init();
