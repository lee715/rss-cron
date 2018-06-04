require('./mongo')
const {countMs} = require('./job')

setInterval(() => {
  countMs()
}, 30 * 1000)
