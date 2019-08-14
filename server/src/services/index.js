const accounts = require('./accounts/accounts.service.js');
const posts = require('./posts/posts.service.js');
const likes = require('./likes/likes.service.js');
const comments = require('./comments/comments.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(accounts);
  app.configure(posts);
  app.configure(likes);
  app.configure(comments);
};
