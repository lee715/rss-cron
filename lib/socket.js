const Redis = require('ioredis')
const config = require('config')

const subRedis = new Redis(config.redis_host)
const pubRedis = new Redis(config.redis_host)

const listeners = {}

subRedis.on('message', (ch, msg) => {
  msg = JSON.parse(msg)
  let {uid, cmd} = msg
  if (!uid || !cmd) return null
  let lisKey = `${cmd}:${ch}`
  let lsns = listeners[lisKey]
  if (!lsns) return null
  for (let lsn of lsns) {
    lsn(msg)
  }
})

exports.start = async (uid, time) => {
  return new Promise((resolve, reject) => {
    addListener({
      cmd: 'start',
      uid: uid,
      time: time
    }, resolve)
    setTimeout(() => {
      reject(new Error('StartTimeout'))
    }, 5000)
  })
}

exports.check = async (uid) => {
  return new Promise((resolve, reject) => {
    addListener({
      cmd: 'check',
      uid: uid
    }, resolve)
    setTimeout(() => {
      reject(new Error('CheckTimeout'))
    }, 5000)
  })
}

exports.close = async (uid) => {
  return new Promise((resolve, reject) => {
    addListener({
      cmd: 'close',
      uid: uid
    }, resolve)
    setTimeout(() => {
      reject(new Error('CloseTimeout'))
    }, 5000)
  })
}

const addListener = (msg, cb) => {
  let skey = `s:devices@${msg.uid}`
  let ckey = `c:devices@${msg.uid}`
  subRedis.subscribe(ckey)
  pubRedis.publish(skey, JSON.stringify(msg))
  let lisKey = `${msg.cmd}:${ckey}`
  if (!listeners[lisKey]) listeners[lisKey] = []
  listeners[lisKey].push(cb)
}
