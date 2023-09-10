document.getElementById("shorten-form").addEventListener("submit", async e => {
  e.preventDefault()

  const url = document.getElementById("url").value

  if (!url) return

  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'()\*\+,;=.]+$/gm

  if (!url.match(urlRegex)) {
    alert("Please enter a valid URL")
    return
  }

  const data = await getShortenedUrl(url)

  if (data.error) {
    alert(data.error)
    return
  }

  const { shortUrl } = data

  navigator.clipboard.writeText(shortUrl)

  alert(`Copied to clipboard: ${shortUrl}`)
  document.getElementById("url").value = ""
})

async function getShortenedUrl(url) {
  const response = await fetch("/api/v1/url/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  })

  const data = await response.json()
  return data
}
