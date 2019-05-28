const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianNoYXd2ZXIyMTAiLCJhIjoiY2p2emYxZjMxMHB3YzN5cDhva3Uzb3NociJ9.1NplTuk7iuap0n4d9bVX2g'

  request({url, json: true}, (error, { body }) => {
    if (error){
      return callback('Unable to connect to location services', undefined)
    }
    if (body.message || body.features.length === 0) {
      return callback('Unable to find location', undefined)
    }

    callback( undefined, {
      long: body.features[0].center[0],
      lat: body.features[0].center[1],
      name: body.features[0].place_name
    })


  })
}

module.exports = geocode
