import Url from "../models/urlModel.js"
import Code from "../models/codeModel.js"
import logger from "../utils/logger.js"
import config from "../config/dotenv.js"

const { API_URL } = config

class ShortnerService {
  /**
   * Generates a random string with the length passed as parameter.
   *
   * @param {Int} length - The length of the string to be generated.
   * @returns {String} - The random string generated.
   * @throws {Error}- An error if the length is not a positive integer.
   */
  static #generateShortUrlCode = length => {
    let shortUrlCode = ""
    const allowedChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    if (length <= 0 || typeof length !== "number") {
      throw new Error("Length must be a positive integer")
    }

    // this algorithm has a limit of allowedChars.length^length possible combinations
    // it will generate a random string with the length passed as parameter
    // and will use math.floor and math.random to generate a random index to get
    // a random char from the allowedChars string and then concatenate it to the shortUrlCode

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length)
      shortUrlCode += allowedChars[randomIndex]
    }

    return shortUrlCode
  }

  /**
   * Creates the short URL code and saves it in the database.
   *
   * @async - This method is asynchronous because it will make a request to the database.
   * @param {String} longUrl - The long URL to be shortened.
   * @param {Int} attempt - The number of attempts made to create the short URL.
   * @returns {Promise <string>} - A promise that resolves with the short URL or an error message.
   * @throws {Error} - If the process fails.
   * @throws {Error} - If the URL was not found in the database.
   */
  static createShortUrl = async (longUrl, attempt) => {
    const shortUrlCodeGenerated = this.#generateShortUrlCode(5)

    try {
      const codeAlreadyExists = await Code.findOne({
        where: { code: shortUrlCodeGenerated },
      })

      if (codeAlreadyExists) {
        return this.#recursiveCreateShortUrl(longUrl, attempt)
      }

      // url is the url object created in the database
      const url = await Url.create({ url: longUrl })

      await Code.create({
        code: shortUrlCodeGenerated,
        urlId: url.id,
      })

      const urlObject = await this.getUrlObject(shortUrlCodeGenerated)

      return `${API_URL}/${urlObject.code}`
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  /**
   * Recursive function to call the createShortUrl method again if the code already exists in the database.
   *
   * @param {String} longUrl - The long url to be shortened.
   * @param {Int} attempt - The number of attempts made to create the short URL.
   * @returns {void} - Returns nothing.
   * @throws {Error} - If the process fails or if the url was not found in the database.
   * @throws {Error} - If the number of attempts is greater than 5.
   * @see createShortUrl
   */
  static #recursiveCreateShortUrl(longUrl, attempt) {
    try {
      attempt++
      if (attempt > 5) throw new Error("Too many attempts")

      this.createShortUrl(longUrl, attempt)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  /**
   * Gets the the url object from the database.
   *
   * @async - This method is asynchronous because it will make a request to the database.
   * @param {String} shortUrlCode - The short url code to be searched in the database.
   * @returns {Promise <object>} - A promise that resolves with the url object from the database or an error message.
   * @throws {Error} - If the url was not found in the database.
   */
  static getUrlObject = async shortUrlCode => {
    try {
      const urlObject = await Code.findOne({
        raw: true, // removes metadata from the response
        where: { code: shortUrlCode },
        include: { model: Url, attributes: ["url"] },
      })

      if (!urlObject) throw new Error("Url not found")

      return urlObject
    } catch (err) {
      throw err
    }
  }
}

export default ShortnerService
