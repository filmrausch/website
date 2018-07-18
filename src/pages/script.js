const flkty = new Flickity( '.carousel', {
  initialIndex: startIndex(dates.map(date => addHours(new Date(date), 20))),
  lazyLoad: 1,
  prevNextButtons: false,
  adaptiveHeight: true,
  hash: true,
})

flkty.on('select', i => {
  document.querySelectorAll('.controls__link').forEach(e => e.classList.remove('active'))
  document.querySelectorAll('.controls__link')[i].classList.add('active')
})

document.getElementById('btn-prev').addEventListener('click', () => {
  flkty.previous()
})
document.getElementById('btn-next').addEventListener('click', () => {
  flkty.next()
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
