const request = require('request')

const getGeoCode = (address, callback) => {
    request(
        {
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaGFyaWRldmVsb3BzIiwiYSI6ImNqdjNuaDlpNTFsdTY0ZW1ud3U4aDEzc2IifQ.3dtsdMI5168B0o1CzEIN9w&limit=1`,
            method: 'GET',
            json: true
        }, (err, response) => {
            if (err) {
                callback('Unable to connect to location services', undefined)
            } else if (response.body.features.length === 0) {
                callback('Unable to find location. Try another search', undefined)
            } else {
                const data = response.body.features[0].center;
                callback(null, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                });
            }
        }
    )
}


module.exports = { getGeoCode }