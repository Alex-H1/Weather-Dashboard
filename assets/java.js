// make a search bar
//  when user clicks search bar and searches for city.
// city is added to search history
// then the current weather data shows up
// when viewing the weather data the user sees the city name,  the date and an icon that represents the weather conditions as well as temperature, humidity the wind speed and uv index.
// when viewing uv index there is a condition indicator 
// when viewing the weather the is a five day forcast there is a date a icon of weather conditions the temperature and humidity.
var searchEl = $('#search');
var citySubmit = $('#getCity');
var btnEl=$('#btn');
var titleEl = $('#dailyWeather');
var localTempEl = $('#localTemp');
var humidityEL = $('#humidity');
var windSpeedEl = $('#windSpeed');
var uviEl = $('#uvi');
var searchLog = [];
var cityName;
var humidity;
var windSpeed;
var temp;

function getLocation(event){
    event.preventDefault();    
    city = $('#search').val().trim();
    saveSearch(city);
    if(city){
        // put city in api endpoint
        getWeather(city);
       
    }else{
        console.log('no city');
    }


};

function getUviforecast(lat,lon){
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon='+ lon + '&exclude=hourly,minutely,alert&appid=774227cba4191819abc929f4c68a7098';
    fetch(url).then(response=>{
        if(response.ok){
            response.json().then(data=>{
               
                var uviEl = document.getElementById('uvi');
                uviEl.textContent = 'uvi  ' + data.current.uvi; 
            })
        }
    })
}

function getWeather(city){

    var weather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=774227cba4191819abc929f4c68a7098';
    fetch(weather)

    .then(response =>{
        if(response.ok){
            response.json().then(data =>{
                weatherData = data;
                console.log(weatherData);
                temp = weatherData.main.temp;
                humidity = weatherData.main.humidity;
                windSpeed = weatherData.wind.speed;
                cityName = weatherData.name;
                getUviforecast(weatherData.coord.lat, weatherData.coord.lon);
               
                cityDisplay(weatherData);

            });

        }
    })
}



function cityDisplay(weatherData){
    var unixTime = moment.unix(weatherData.dt).format('MM/DD/YYYY');

    // displays city name
    var cityTitle = document.createElement('h1');
    cityTitle.textContent = cityName +' '+ unixTime;


    titleEl.append(cityTitle);

    // displays local temp
    var displayTemp = document.createElement('p');
    displayTemp.textContent = 'temperature  ' + temp;

    localTempEl.append(displayTemp);

    // display local humidity
    var localHumidity = document.createElement('p');
    localHumidity.textContent = 'humidity  ' + humidity;
    
    humidityEL.append(localHumidity);

    // display wind speed
    var localWind = document.createElement('p');
    localWind.textContent = 'Wind Speed  ' + windSpeed;

    windSpeedEl.append(localWind);



};
function saveSearch(city){
    searchLog.push(city);
    localStorage.setItem('searchLog',searchLog);
};

$('#btn').on('click',getLocation);