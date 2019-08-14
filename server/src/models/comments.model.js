// comments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const comments = new Schema({
    message: { type: String, required: true },
    account: {type: String, required: true, ref: 'accounts', index: true},
  }, {
    timestamps: true
  });

  return mongooseClient.model('comments', comments);
};
