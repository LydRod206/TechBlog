const Comment = require('./Comment');
const Post = require('./Post');
const Users = require('./Users');

Users.hasMany(Post, {
  foreignKey: 'userId',
});
Post.belongsTo(Users, {
  foreignKey: 'userId',
});
Post.hasMany(Comment, {
  foreignKey: 'postId',
});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = {
  Comment,
  Post,
  Users,
};
