import supertest from "supertest"
import app from "../src/app.js"
import sequelize from "../src/config/database.js"
import logger from "../src/utils/logger.js"

const request = supertest(app)

test("POST /api/v1/url/shorten should return 201", async () => {
  try {
    const response = await request.post("/api/v1/url/shorten").send({
      url: "https://www.google.com",
    })
    return expect(response.status).toBe(201)
  } catch (err) {
    logger.error(err)
    console.log(err)
  }
})

test("POST /api/v1/url/shorten should return 400", async () => {
  try {
    const response = await request.post("/api/v1/url/shorten").send({
      url: "htttps://www.google.com",
    })
    return expect(response.status).toBe(400)
  } catch (err) {
    logger.error(err)
    console.log(err)
  }
})

test("GET /api/v1/url/:code should return 200", async () => {
  try {
    const postResponse = await request.post("/api/v1/url/shorten").send({
      url: "https://www.google.com",
    })
    const shortUrlCode = postResponse.body.shortUrlCode
    const getResponse = await request.get(`/api/v1/url/shorten/${shortUrlCode}`)
    return expect(getResponse.status).toBe(200)
  } catch (err) {
    logger.error(err)
    console.log(err)
  }
})

it("Should return the original URL", async () => {
  const url = "https://www.google.com"
  try {
    const postResponse = await request.post("/api/v1/url/shorten").send({
      url,
    })
    const shortUrlCode = postResponse.body.shortUrlCode
    const getResponse = await request.get(`/api/v1/url/shorten/${shortUrlCode}`)
    return expect(getResponse.body.url).toBe(url)
  } catch (err) {
    logger.error(err)
    console.log(err)
  }
})

// Ends database connection after all tests are done
afterAll(async () => await sequelize.close())
