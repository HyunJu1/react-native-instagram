var express = require('express');

var db = require('../../models');
const asyncError = require('../../utils/async-error');
var router = express.Router();

module.exports = function(app) {

  router.post('/', asyncError(async (req, res, next) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      image:req.body.image
    }).then( user => {
      res.json(user.toJSON());
    }).catch( error => {
      if (error.name == 'SequelizeUniqueConstraintError') {
        return res.status(422).json({code: 101, message: 'username exists'});
      }
      next(error);
    });
  }));

  router.use(app.oauth.authenticate());
  router.use('/me', asyncError(async(req, res) => {
    res.json(await db.User.findById(req.res.locals.oauth.token.user.id));
  }));

  
  router.get('/', asyncError(async (req, res, next) => {
    const users = await db.User.findAll({});
    res.json(users);
  }));
  
  //특정 유저 info갖고오기 (프로필 사진 가져올때 쓰려고 만듬)
  router.get('/:id', asyncError(async (req, res, next) => {
    const userInfo = await db.User.findAll({
      where: {
        name: req.params.id
      },});
  
    res.json(userInfo);
  }));
  
  
  
  
  
  return router;





};



