const ddmm = date =>
  ('0' + date.getDate()).slice(-2) + '.'
  + ('0' + (date.getMonth() + 1)).slice(-2) + '.'

export default ddmm