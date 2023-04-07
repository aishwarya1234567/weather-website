const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=' + process.env.GEOCODE_ACCESS_TOKEN

    request({url, json:true}, (error,{body})=>{
        if(error)
        {
            callback('Error connecting to location services!!', undefined)
        }
        else if(body.features.length == 0)
        {
            callback('Unable to find location!!', undefined)
        }
        else
        {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode