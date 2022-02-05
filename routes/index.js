var express = require('express');
var router = express.Router();
const ObjectModel = require('../models/objects');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-objects-list', async function (req, res, next) {
  // on recupère tous les objets de la base
  let objectsList = await ObjectModel.find();
  
  res.json({ objects: objectsList });
});

router.post('/add-object', async function (req, res, next) {
  // ajoute un objet dans la collection objects dans la base de donnée
  let result =false;
  let objectSaved = null;
  if (req.body.name) {
    let newObject = new ObjectModel ({
      name: req.body.name,
      type: req.body.type,
      color: req.body.color,
      found_location: req.body.found_location,
      desc: req.body.desc,
      date: req.body.date,
      contact: req.body.contact,
      });

    objectSaved = await newObject.save();
  }
  if (objectSaved ) {
    result = true;
  };
  res.json({ result });
});

router.delete('/delete-object/:_id', async function (req, res, next) {
  
  let result=false
  // supprime un element de la collection dans la base de donnée
  let {deletedCount} = await ObjectModel.deleteOne({ _id: req.params._id })
  
  if (deletedCount === 1) {
    result = true;
  } else {
    result = false;
  }
  res.json({ result });
});

module.exports = router;
