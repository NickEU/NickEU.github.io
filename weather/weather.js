"use strict";
function toggleClicked() {
  var tempText = document.getElementById("temp");
  if (temp.cDisplayed == 1) {
    tempText.textContent = temp.f + " °F";
    temp.cDisplayed = 0;
  }
  else {
    tempText.textContent = temp.c + " °C";
    temp.cDisplayed = 1;
  }
  
};
  
function getWeather(response) {
  document.getElementById("country").textContent = response.name;
  temp.c = response.main.temp.toFixed(1);
  temp.f = (temp.c * 9 / 5 + 32).toFixed(1);
  document.getElementById("temp").textContent = temp.c + " °C";
  temp.cDisplayed = 1;
  document.getElementById("container").style.visibility = "visible";
  console.log(response);
};

function getLoc(response) {
  var geo = response.loc.split(',');
  console.log(geo);
  var weatherTag = document.createElement("script");
  weatherTag.src = 'http://api.openweathermap.org/data/2.5/weather?lat=' + geo[0] + '&lon=' + geo[1] + '&units=metric&callback=getWeather&appid=80f8b2429407d4784a3e920826f54555';
  document.getElementsByTagName("head")[0].appendChild(weatherTag);
};

var locTag = document.createElement("script");
locTag.src = 'http://ipinfo.io?callback=getLoc';

document.getElementsByTagName("head")[0].appendChild(locTag);

toggle.addEventListener('click', toggleClicked, false);

