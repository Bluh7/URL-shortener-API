import ShortnerService from "../services/shortnerService.js"
import logger from "../utils/logger.js"

class UrlShortnerController {
  /**
   * Creates a short URL from a given URL.
   *
   * @returns {Promise<void>} - A promise that resolves with the short URL and the short URL code or an error message.
   * @throws {Error} - Throws an error if the process fails.
   */
  static async postUrl(req, res) {
    const { url } = req.body || {}

    try {
      const shortUrl = await ShortnerService.createShortUrl(url, 0)
      return res
        .status(201)
        .json({ shortUrl, shortUrlCode: shortUrl.split("/").pop() })
    } catch (err) {
      logger.error(err)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  /**
   * Gets the original URL from a given short URL code.
   *
   * @returns {Promise<void>} - A promise that resolves with the original URL or an error message.
   * @throws {Error} - Throws an error if the process fails or if the URL was not found in the database.
   */
  static async getUrl(req, res) {
    let { code } = req.params || {}

    try {
      const urlObject = await ShortnerService.getUrlObject(code)
      const url = urlObject["url.url"]

      return res.status(200).json({ url })
    } catch (err) {
      if (err.message === "Url not found") {
        return res.status(404).json({ error: "Url not found" })
      }

      logger.error(err)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

export default UrlShortnerController
