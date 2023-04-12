const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.FORECAST_ACCESS_KEY + '&query=' + latitude + ',' +longitude

    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to Weather services', undefined)
        }
        else if(body.error)
        {
            callback('Unable to connect to Weather services', undefined)
        }
        else
        {
            callback(undefined, {
                location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
                forecastData: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}  degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
            })
        }
    })
}

module.exports = forecast