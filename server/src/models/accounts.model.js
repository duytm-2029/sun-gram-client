// accounts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const accounts = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: {type: String, required: true},
    name: {type: String},
    description: {type: String},
    user_image_url: {type: String},
  }, {
    timestamps: true
  });

  return mongooseClient.model('accounts', accounts);
};
