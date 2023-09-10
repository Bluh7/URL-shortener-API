const checkIfItIsUrl = (req, res, next) => {
  const { url } = req.body || {}

  const urlRegex = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'()\*\+,;=.]+$/gm
  )

  if (!url) {
    return res.status(400).json({ error: "Url is required!" })
  }

  if (typeof url !== "string") {
    return res.status(418).json({ error: "Url must be a string!" })
  }

  if (!urlRegex.test(url)) {
    return res.status(400).json({ error: "Invalid URL!" })
  }

  next()
}

export { checkIfItIsUrl }
