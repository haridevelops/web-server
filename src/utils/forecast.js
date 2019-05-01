const request = require('request')

const getForeCast = (data, callback) => {
    request(
        {
            url: `https://api.darksky.net/forecast/8b82912fc1e0cf52f29b43801b750649/${data[1]},${data[0]}?units=us`,
            method: 'GET',
            json: true 
        }, (err, response) => {
            if (err) {
                callback('Unable to connect to location services', null);
            } else if (response.body.error) {
                callback('Unable to find location', null)
            } else {
                const data = response.body.currently;
                callback(null, 'It is currently '+ data.temperature+ ' degrees out. There is '+ data.precipProbability +'% chance of rain')
            }
        }
    )
}

module.exports = { getForeCast:getForeCast }