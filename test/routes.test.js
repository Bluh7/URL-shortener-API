import supertest from "supertest"
import app from "../src/app.js"
import sequelize from "../src/config/database.js"
import logger from "../src/utils/logger.js"

const request = supertest(app)

test("GET /:code should return 200", async () => {
  try {
    const postResponse = await request.post("/api/v1/url/shorten").send({
      url: "https://www.google.com",
    })
    const shortUrlCode = postResponse.body.shortUrlCode
    const getResponse = await request.get(`/${shortUrlCode}`)
    return expect(getResponse.status).toBe(200)
  } catch (err) {
    logger.error(err)
    console.log(err)
  }
})

test("GET /-- should return 302", async () => {
  try {
    const response = await request.get(`/--`)
    return expect(response.status).toBe(302)
  } catch (err) {
    logger.error(err)
    console.log(err)
  }
})

// Ends database connection after all tests are done
afterAll(async () => await sequelize.close())
