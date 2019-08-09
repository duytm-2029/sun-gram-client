// likes-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const likes = new Schema({
    type: { type: Number, required: true, enum: [
      0, // like
      1, // love
      2, // haha
      3, // wow
      4, // sad
      5, // angry
    ] },
    account: {type: String, required: true, ref: 'accounts', index: true},
  }, {
    timestamps: true
  });

  return mongooseClient.model('likes', likes);
};
