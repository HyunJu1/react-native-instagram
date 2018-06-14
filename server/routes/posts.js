const express = require('express');
const router = express.Router();
const Posts = require('../models').Post;
const Users = require('../models').User;

const catchErrors = require('../utils/async-error');



router.get('/', catchErrors(async (req, res) => {
  const users=Posts.belongsTo(Users);
  const posts = await Posts.findAll({
    include:[users],
    order: [ [ 'createdAt', 'DESC' ]]
  });

  res.json(posts);
  

}));

router.get('/mypost/:id', catchErrors(async (req, res) => {

  const users=Posts.belongsTo(Users);
  const myposts = await Posts.findAll({
    where: {
      UserId: req.params.id
    },
    include:[users],
    order: [ [ 'createdAt', 'DESC' ]]
   
  });

  res.json(myposts);

}));

router.get('/:id', catchErrors(async (req, res) => {

  const users=Posts.belongsTo(Users);
  const postDetail = await Posts.findAll({
    where: {
      id: req.params.id
    },
    include:[users]
   
  });

  res.json(postDetail);

}));

router.put('/:id', catchErrors(async (req, res) => {
  const post = await Posts.findById(req.params.id);
  if (post) {
    await post.update({
      title: req.body.title || post.title,
      UserId: req.body.name || post.name,
      content: req.body.content || post.content
    });
    res.status(200).send(post);
  } else {
    res.status(404).send({ error: 'Not exist id' });
  }
}));

router.post('/', catchErrors(async (req, res) => {
  const post = await Posts.create({

    title: req.body.title,
    UserId: req.body.name,
    content: req.body.content,
    image:req.body.image,
    likes:req.body.likes
    
  });
  if(post){
    res.status(201).send(post);}
  else {
    res.status(422).send({err: 'Not exist id' });
  }
}));

router.delete('/:id', catchErrors(async (req, res) => {
  const post = await Posts.findById(req.params.id);
  if (post) {
    await post.destroy();
    res.status(204).send({});
  } else {
    res.status(404).send({ error: 'Not exist id' });
  } 
}));

module.exports = router;