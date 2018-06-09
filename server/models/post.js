'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};