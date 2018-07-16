const flkty = new Flickity( '.carousel', {
  initialIndex: startIndex(dates.map(date => addHours(new Date(date), 20))),
  lazyLoad: 1
})

/* helper functions */

function startIndex(dates) {
  const index = dates.reduce((acc, date) => ((Date.now() - date) >= 0) ? acc += 1 : acc, 0)
  return Math.min(index, dates.length - 1)
}

function addHours(date, h) {
  const res = new Date()
  res.setTime(date.getTime() + (h*60*60*1000))
  return res
}
