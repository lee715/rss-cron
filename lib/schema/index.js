
module.exports = (Schema) => {
  return {
    Device: require('./device')(Schema)
  }
}
