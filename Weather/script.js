const API_KEY = 'b859efcb6dfa2a5baa3016af5d11318e'; 

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    console.log("Fetching weather for:", city);
    console.log("API URL:", url);


  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();

    console.log("API response:", data);

    console.log("Condition (main):", data.weather[0].main);
    console.log("Description:", data.weather[0].description);

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${data.main.temp.toFixed(1)}°C`;
    const rawDescription = data.weather[0].description.toLowerCase();
    const customDescriptions = {
      "clear sky": "Sunny",
      "few clouds": "Partly Cloudy",
      "scattered clouds": "Cloudy",
      "broken clouds": "Mostly Cloudy",
      "overcast clouds": "Cloudy",
      "light rain": "Light Rain",
      "moderate rain": "Rainy",
      "heavy intensity rain": "Heavy Rain",
      "drizzle": "Drizzle",
      "thunderstorm": "Stormy",
      "haze": "Hazy",
      "mist": "Misty"
  };

const friendlyDescription = customDescriptions[rawDescription] || rawDescription;
document.getElementById('condition').innerText = friendlyDescription;

    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('wind').innerText = (data.wind.speed * 3.6).toFixed(1);

    document.getElementById('icon').innerText = getWeatherIcon(data.weather[0].description.toLowerCase().trim());


    document.getElementById('weatherInfo').classList.remove('hidden');
  } catch (error) {
    alert('Could not fetch weather data. Please check the city name.');
    console.error(error);
  }
}

document.getElementById('cityInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getWeather();
    }
  });

function getWeatherIcon(description) {
  const icons = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '🌥️',
    'broken clouds': '☁️',
    'overcast clouds': '☁️',
    'light rain': '🌦️',
    'moderate rain': '🌧️',
    'heavy intensity rain': '🌧️',
    'very heavy rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
    'haze': '🌫️',
    'smoke': '💨',
    'fog': '🌁',
    'dust': '🌪️',
    'drizzle': '🌦️'
  };

  return icons[description] || '🌈';

}






















/*const API_KEY = 'b859efcb6dfa2a5baa3016af5d11318e'; // Replace with your real API key
//const API_KEY = 'b62b16e8d53e79b1932436dd122c4228';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},appid=${API_KEY}&units=metric&t=${Date.now()}`;

    console.log("Fetching weather for:", city);
    console.log("API URL:", url);


  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();

    console.log("API response:", data);

    console.log("Condition (main):", data.weather[0].main);
    console.log("Description:", data.weather[0].description);

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById('condition').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('wind').innerText = (data.wind.speed * 3.6).toFixed(1);

    document.getElementById('icon').innerText = getWeatherIcon(data.weather[0].description.toLowerCase().trim());


    document.getElementById('weatherInfo').classList.remove('hidden');
  } catch (error) {
    alert('Could not fetch weather data. Please check the city name.');
    console.error(error);
  }
}

function getWeatherIcon(description) {
  const icons = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '🌥️',
    'broken clouds': '☁️',
    'overcast clouds': '☁️',
    'light rain': '🌦️',
    'moderate rain': '🌧️',
    'heavy intensity rain': '🌧️',
    'very heavy rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
    'haze': '🌫️',
    'smoke': '💨',
    'fog': '🌁',
    'dust': '🌪️',
    'drizzle': '🌦️'
  };

  return icons[description] || '🌈';

  
}
*/