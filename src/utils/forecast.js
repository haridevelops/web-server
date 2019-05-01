const request = require('request')

const getForeCast = (latitude, longitude, callback) => {
    request(
        {
            url: `https://api.darksky.net/forecast/8b82912fc1e0cf52f29b43801b750649/${latitude},${longitude}?units=us`,
            method: 'GET',
            json: true 
        }, (err, response) => {
            if (err) {
                callback('Unable to connect to location services', null);
            } else if (response.body.error) {
                callback('Unable to find location', null)
            } else {
                const data = response.body.currently;
                callback(null, data.summary + '. It is currently '+ data.temperature+ ' degrees out. High today is ' + response.body.daily.data[0].temperatureHigh + ' with a low of ' + response.body.daily.data[0].temperatureLow +' There is '+ data.precipProbability +'% chance of rain')
            }
        }
    )
}

module.exports = { getForeCast:getForeCast }