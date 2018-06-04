const db = require('limbo').use('anmoyi')
const sockSrv = require('./socket')
const redis = require('./redis')

exports.countMs = async () => {
  console.log('count ms start', new Date())
  let devices = await db.device.find({}).exec()
  console.log('handle ' + devices.length)
  devices.forEach(async (d) => {
    let start = new Date()
    let ms
    try {
      await sockSrv.check(d.uid)
    } catch (e) {
      await sockSrv.close(d.uid)
      console.log(`err occured, and closed ${d.uid}`)
      ms = 9999
    }
    let end = new Date()
    if (!ms) ms = end - start
    console.log(`${d.uid}: ${ms}`)
    redis.setex(`devices:ms:${d.uid}`, 60, ms)
  })
}
