const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
);

// Define association between Comment and Post models
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = Comment;
