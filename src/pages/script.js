const dates = document.querySelectorAll(".movie__date")
dates.forEach(date => {
  date.innerHTML = new Date(date.getAttribute("data-date")).toLocaleDateString("en-GB")
})