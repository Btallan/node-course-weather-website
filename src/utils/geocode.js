const request = require('postman-request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiYnRhbGxhbiIsImEiOiJjbTV3Y29oYmUwYjhqMmpxNjBwcW51dTJwIn0.nOAHqXlOhDrG_HdyAuVnMg&limit=1'

    request({ url: geocodeURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[0],
                longitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode