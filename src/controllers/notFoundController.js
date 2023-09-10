class NotFoundController {
  static notFound(req, res) {
    return res.status(302).redirect("/")
  }
}

export default NotFoundController
