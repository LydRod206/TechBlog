const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
  foreignKey: 'userId',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

Comment.belongsTo(User, 
  { foreignKey: 'userId' 
});

module.exports = {
  Comment,
  Post,
  User,
};
