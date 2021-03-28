"strict";
let loc = document.querySelector("#location");
let tempIcon = document.querySelector("#temp-icon");
let tempValue = document.querySelector("#temp-value");
let climate = document.querySelector("#climate");
let iconFile;
const searchInput = document.querySelector("#input-search");
const searchButton = document.querySelector(".sub");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});
const getWeather = async (city) => {
  try {
    const apiKey = "2df120a26355b05dc512460126e94c62";
    const proxy = "http://cors-anywhere.herokuapp.com/";
    await fetch(
      `${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { name } = data;
        const { feels_like } = data.main;
        const { id, main } = data.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - 273);
        if (id >= 200 && id < 300) {
          tempIcon.src = "thunderstorm.png";
        } else if (id >= 300 && id < 400) {
          tempIcon.src = "cloud.png";
        } else if (id >= 500 && id < 600) {
          tempIcon.src = "rainy.png";
        } else if (id >= 600 && id < 700) {
          tempIcon.src = "clouds.png";
        } else if (id >= 700 && id < 800) {
          tempIcon.src = "haze.png";
        } else if (id == 800) {
          tempIcon.src = "sunny.png";
        } else {
          tempIcon.src = "clouds.png";
        }
        //console.log(data);
      });
  } catch (error) {
    alert("CITY NOT FOUND");
  }
};
window.addEventListener("load", () => {
  let long;
  let lat;
  const proxy = "http://cors-anywhere.herokuapp.com/";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const apiKey = "2df120a26355b05dc512460126e94c62";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];
          loc.textContent = name;
          climate.textContent = main;
          tempValue.textContent = Math.round(feels_like - 273);
          if (id >= 200 && id < 300) {
            tempIcon.src = "thunderstorm.png";
          } else if (id >= 300 && id < 400) {
            tempIcon.src = "cloud.png";
          } else if (id > 500 && id < 600) {
            tempIcon.src = "rainy.png";
          } else if (id >= 600 && id < 700) {
            tempIcon.src = "clouds.png";
          } else if (id == 800) {
            tempIcon.src = "sunny.png";
          }
        });
    });
  }
});
