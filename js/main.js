

// ________ Init global variables
var submitButton = document.getElementById("submit-button");
var cityName = document.getElementById("city-name");



// ________ Run program if Submit is clicked
submitButton.addEventListener("click", function () {
    var mapContainer = document.getElementById("map-container");

    if (mapContainer == null) {
        createMapContainer()
        getTemperature(cityName.value);
    }
    else {
        mapContainer.remove();
        createMapContainer()
        getTemperature(cityName.value);
    }
});



// ________ Create container for map
function createMapContainer(){
    var mapContainer = document.createElement("div");
    mapContainer.setAttribute("id", "map-container");
    document.getElementById("container").appendChild(mapContainer);
};



// ________ Download data of choice city
function getTemperature(city){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=e589a09c9a4af75930b36642dac4e5ad')
        .then(weatherData => weatherData.json())
        .then(weatherData => {
            var temp = (weatherData.main.temp);
            var longitude = (weatherData.coord.lon);
            var latitude = (weatherData.coord.lat);
            var pressure = (weatherData.main.pressure);
            var humidity = (weatherData.main.humidity);
            var wind = (weatherData.wind.speed);
            var description = (weatherData.weather[0].description);
            initmap(city, temp, longitude, latitude, pressure, humidity, wind, description)
        })
};



// ________ Move data of city to map
function initmap(city, temp, longitude, latitude, pressure, humidity, wind, description) {

    // Create new map
    var map = new L.Map('map-container');

    // Create the tile layer with correct attribution
    var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib=' © <a href="https://openstreetmap.org">OpenStreetMap</a> | © <a href="https://openweathermap.org">OpenWeatherMap</a>';

    var mapInfo = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

    // Set the view of map
    map.setView(new L.LatLng(latitude, longitude),9);
    map.addLayer(mapInfo);

    // Set the marker of map
    var marker = L.marker([latitude, longitude]).addTo(map)
    marker.bindPopup(
        "<span class='popup popup--title'>" + city + "<br></span>" +
        "<span class='popup popup--subtitle'>" + description + "</span>" +
        "<br>" +
        "<span class='popup popup--info'>" +
        "Temperature: " + temp + " °C" + "<br>" +
        "Pressure: " + pressure + " hPa<br>" +
        "Humidity: " + humidity + "%<br>" +
        "Wind speed: " + wind + " km/h<br>" +
        "</span>").openPopup();
};







