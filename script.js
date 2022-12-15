let weather = {
    "apiKey": "f820fd905393e40aec82ce97b6630c7f",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city
            + "&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".weather-type").innerText = description.toUpperCase();
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.body.style.backgroundImage = "url('https://api.unsplash.com/photos/random?query=" + name + "&client_id=YOUR_ACCESS')";
    }
}

weather.fetchWeather("Mumbai");

document.querySelector(".search-button").addEventListener("click", function () {
    weather.fetchWeather(document.querySelector(".search-bar").value);
});

//on enter key press search weather
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.fetchWeather(document.querySelector(".search-bar").value);
    }
}