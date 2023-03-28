const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c4d8d30ac7e8fe7ef9a06e54df8130cd&query=' + latitude + ',' +longitude

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
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast