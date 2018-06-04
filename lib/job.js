const db = require('limbo').use('anmoyi')
const sockSrv = require('./socket')
const redis = require('./redis')

exports.countMs = async () => {
  let devices = await db.device.find({})
  devices.forEach(async (d) => {
    let start = new Date()
    await sockSrv.check(d.uid)
    let end = new Date()
    let ms = end - start
    redis.setex(`devices:ms:${d.uid}`, 2 * 60, ms)
  })
}
