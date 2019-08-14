// posts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const posts = new Schema({
    permalink_url: { type: String },
    account: {type: String, required: true, ref: 'accounts', index: true},
    message: {type: String, required: true},
    media: {type: String, } // should re-check
  }, {
    timestamps: true
  });

  return mongooseClient.model('posts', posts);
};
