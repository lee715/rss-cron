module.exports = function (Schema) {
  let deviceSchema
  deviceSchema = new Schema({
    uid: String,
    name: String,
    _placeId: Schema.Types.ObjectId,
    disabled: {
      type: Boolean,
      'default': false
    },
    type: {
      type: String,
      'default': 'normal'
    },
    created: {
      type: Date,
      'default': Date.now
    }
  }, {
    toJSON: {
      virtuals: true,
      getters: true
    }
  })
  return deviceSchema
}
