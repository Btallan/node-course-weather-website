const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const weatherURL = 'https://api.weatherstack.com/current?access_key=07615d5ac0a215b2b83f6046bc4de647&query=' + longitude + ',' + latitude

    request({ url: weatherURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find. Try another search!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out but feels like " 
                + body.current.feelslike + " degrees. The humidity is currently " + body.current.humidity + "% with a " + body.current.precip + "% chance of rain today. The wind speed is " + 
                body.current.wind_speed + " km/hr from the " + body.current.wind_dir )
        }
    })
}



module.exports = forecast

