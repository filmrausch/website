const dates = []
const dateNodes = document.querySelectorAll(".movie__date")
dateNodes.forEach(elem => {
  const date = new Date(elem.getAttribute("data-date"))
  dates.push(date)
  elem.innerHTML = date.toLocaleDateString("en-GB")
})

const flkty = new Flickity( '.carousel', {
  initialIndex: startIndex(dates)
});

/* helper functions */

function startIndex(dates) {
  const index = dates.reduce((acc, date) => ((Date.now() - addHours(date, 20)) >= 0) ? acc += 1 : acc, 0)
  return Math.min(index, dates.length - 1)
}

function addHours(date, h) {
  const res = new Date()
  res.setTime(date.getTime() + (h*60*60*1000))
  return res
}
