/* global sneaky */
sneaky('ay', function () {
  this.description = 'Deploy to dev environment'
  this.user = 'root'
  this.host = '47.96.158.74'
  this.path = '~/server/rss-cron/'
  this.filter = `
+ config
+ config/default.json
+ package.json
+ lib**
+ node_modules**
+ index.js
+ yarn.lock
- *
`
  this.after('cd ~/server/rss-cron/ && yarn && pm2 restart rss-cron')
  this.overwrite = true
  this.nochdir = true
})
