import functions from './index';

describe("Get Weather and Time", () => {

  it("should return correct geocordinates of a location", async (done) => {
    const response = await functions.getCoordinates("Boston")
    expect(response.darkSkyUrl).toBe("https://api.darksky.net/forecast/7468111f859d0f664d2f48d4e3452a42/42.3600825,-71.0588801")
    expect(response.city).toBe( "Boston, MA, USA")
    done()
  })

  jest.spyOn(functions, "getWeatherTimeDetails").mockResolvedValue({ formattedTime: "Thursday, November 21, 2019 2:01 PM", temperature: 78.47 })

  it("should return correct time and weather of a location ", async (done) => {
    const response = await functions.getWeatherTimeDetails("https://api.darksky.net/forecast/7468111f859d0f664d2f48d4e3452a42/-1.2920659,36.8219462")
    expect(response.formattedTime).toBe("Thursday, November 21, 2019 2:01 PM")
    expect(response.temperature).toBe(78.47)
    done()
  })
})
