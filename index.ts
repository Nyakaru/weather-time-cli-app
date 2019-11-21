import axios from 'axios'
import { DateTime } from 'luxon'
import { ILocationRes, IDarksApiResponse } from './interface'
require('dotenv').config()

const darkSkyApiKey: string = process.env.DARK_SKY_API_KEY
const gcpKey: string = process.env.GCP_KEY

const darkSkyBaseUrl: string = `https://api.darksky.net/forecast`
const address: Array<string> = process.argv.slice(2)

// Get the latitude and longitude of different locations from the Geocoding API
const getCoordinates = async (address) => {
  const gcpUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + gcpKey
  const res: ILocationRes = await axios.get(gcpUrl)
  const latitude: number = res.data.results[0].geometry.location.lat
  const longitude: number = res.data.results[0].geometry.location.lng
  const city: string = res.data.results[0].formatted_address
  const location: string = latitude + ',' + longitude
  const darkSkyUrl: string = `${darkSkyBaseUrl}/${darkSkyApiKey}/${location}`
  return { darkSkyUrl, city }
}

//Get the weather and time details from of different locations from the Dark Sky API
const getWeatherTimeDetails = async (darkSkyUrl) => {
  const res = await axios.get(darkSkyUrl)
  const time: number = res.data.currently.time
  const formattedTime: string = DateTime.fromSeconds(time).setZone(res.data.timezone).toFormat('DDDD t')
  const temperature: number = res.data.currently.temperature
  return { formattedTime, temperature }
}

// Map the details of different locations and print the output
address.map((item: string) => {
  const urlPromise = getCoordinates(item)
  urlPromise.then(async (data) => {
    const { darkSkyUrl, city } = data
    const weatherPromise = await getWeatherTimeDetails(darkSkyUrl)
    const { temperature, formattedTime } = weatherPromise
    console.log('It is', temperature, 'Fahrenheit (°F)', 'and', formattedTime, 'O`clock in', city)
  })
})

export default { getCoordinates, getWeatherTimeDetails }
