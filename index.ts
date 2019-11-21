import axios from 'axios'
import { DateTime } from 'luxon'
import { ILocationRes, IDarksApiResponse } from './interface'
require('dotenv').config()

const darkSkyApiKey: string = process.env.DARK_SKY_API_KEY
const gcpKey: string = process.env.GCP_KEY

const darkSkyBaseUrl: string = `https://api.darksky.net/forecast`
const address: Array<string> = process.argv.slice(2)

export const getWeather = ((address: Array<string>, darkSkyApiKey: string, gcpKey: string) => {
  address.map((item: string) => {
    const gcpUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + item + '&key=' + gcpKey
    
    // Get the latitude and longitude of different locations from the Geocoding API
    axios
      .get(gcpUrl)
      .then((res: ILocationRes) => {
        const latitude: number = res.data.results[0].geometry.location.lat
        const longitude: number = res.data.results[0].geometry.location.lng
        const city: string = res.data.results[0].formatted_address
        const location: string = latitude + ',' + longitude
        const darkSkyUrl: string = `${darkSkyBaseUrl}/${darkSkyApiKey}/${location}`

        // Get the weather and time of different locations from the Dark Sky API
        axios
          .get(darkSkyUrl)
          .then((res: IDarksApiResponse) => {
            const time: number = res.data.currently.time
            const formattedTime: string = DateTime.fromSeconds(time)
              .setZone(res.data.timezone)
              .toFormat('DDDD t')
            const temperature: number = res.data.currently.temperature
            
            // Print out the output to the console
            console.log('It is', temperature, 'Fahrenheit (°F)', 'and', formattedTime, 'O`clock in', city)
          })
          // Catch errors
          .catch((err: any) => {
            console.log(err)
          })
      })
      .catch((err: any) => {
        console.log(err)
      })
  })
})

getWeather(address, darkSkyApiKey, gcpKey)
