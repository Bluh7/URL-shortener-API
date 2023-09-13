import ShortnerService from "../services/shortnerService.js"
import logger from "../utils/logger.js"

class RedirectController {
  /**
   * Renders the redirection page with the original URL.
   *
   * @returns {Promise<void>} - A promise that resolves with the redirection to the original URL or an error response.
   * @throws {Error} - Throws an error if an internal server error occurs or if the URL is not found.
   */
  static async redirectToUrl(req, res) {
    const { code } = req.params || {}

    try {
      const urlObject = await ShortnerService.getUrlObject(code)
      const url = urlObject["url.url"]

      return res.status(200).render("redirect.ejs", { url })
    } catch (err) {
      if (err.message === "Url not found") {
        return res.status(404).redirect("/")
      }

      logger.error(err)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

export default RedirectController
