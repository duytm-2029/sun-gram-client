// PostMemberShip-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const PostMemberShip = new Schema({
    post: {type: String, required: true, ref: 'posts', index: true},
    comment: {type: String, required: true, ref: 'comments', index: true},
  }, {
    timestamps: true
  });

  return mongooseClient.model('PostMemberShip', PostMemberShip);
};
