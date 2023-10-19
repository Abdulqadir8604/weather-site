const getTime = (lat, lon) => {
    return fetch(
      `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'X-Api-Key': 'jt/+M9sWLnzvxioz1FbEoQ==zcVoxl9WMsXYLGF1',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then((data) => {
        let timeString = data.day_of_week + ", " + data.hour + ":" + data.minute;
        return timeString;
    });   
}

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
        const { lon, lat } = data.coord;
        getTime(lat, lon)
            .then((timeString) => {
                document.querySelector(".date").innerText = timeString;
        });
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
        document.querySelector(".weather-type").innerText = description.toUpperCase();
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    }
}

weather.fetchWeather("Mumbai");

document.querySelector(".search-button").addEventListener("click", function () {
    weather.fetchWeather(document.querySelector(".search-bar").value);
});

//on enter key press
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.fetchWeather(document.querySelector(".search-bar").value);
    }
})
