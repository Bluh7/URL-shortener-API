import { Router } from "express"
const router = Router()

import UrlShortnerController from "../controllers/urlShortenerController.js"
import RootController from "../controllers/rootController.js"
import RedirectController from "../controllers/redirectController.js"
import NotFoundController from "../controllers/notFoundController.js"

import { checkIfItIsUrl } from "../middlewares/checkIfItIsUrl.js"

// front end routes
router.get("/", RootController.index)
router.get("/:code", RedirectController.redirectToUrl)

// api routes
router.post(
  "/api/v1/url/shorten",
  checkIfItIsUrl,
  UrlShortnerController.postUrl
)
router.get("/api/v1/url/shorten/:code", UrlShortnerController.getUrl)

// 404 route
router.get("*", NotFoundController.notFound)

export default router
