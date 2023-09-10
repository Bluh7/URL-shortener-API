const redirectUrl = document.getElementById("redirect-url").textContent
const redirectMessage = document.getElementById("redirect-message")
const countdown = document.getElementById("countdown")

if (!redirectUrl) {
  window.location.href = "/"
}

if (countdown) {
  let count = 5

  const updateCountdown = () => {
    countdown.textContent = count
    count--

    // -1 because i want to show 0 before redirecting
    if (count < -1) {
      clearInterval(timer) // Stop the timer
      countdown.textContent = "0"
      redirectMessage.textContent = "You are being redirected..."
      window.location.href = redirectUrl
    }
  }

  // Call the function every 1 second
  const timer = setInterval(updateCountdown, 1000)
}
