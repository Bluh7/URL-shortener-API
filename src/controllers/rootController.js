class RootController {
  /**
   * Renders the index page.
   *
   * @returns {void} - Returns void but renders the index page.
   */
  static index(req, res) {
    return res.status(200).render("index.ejs")
  }
}

export default RootController
