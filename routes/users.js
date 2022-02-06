var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel=require('../models/users');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



/* GET users listing. */

router.post('/sign-up', async function (req,res,next){
  let error=[];
  let userSearch=req.body.userEmail.toLowerCase();
  let alreadyIn = await userModel.findOne({userEmail:userSearch});
  if (alreadyIn != null) {
    error.push('Cet email est déjà enregistré.')
  }
  if (req.body.userName === ''
    || req.body.userEmail === ''
    || req.body.userPassword === ''
  ) {
    error.push('Tous les champs sont requis.')
  }

  //si le user n'existe pas et que tous les champs sont rempli on l'ajoute 
  if (error.length === 0) {
  // on encrypte avec un sel aléatoire et un cout de 10
  let hash = bcrypt.hashSync(req.body.userPassword, 10);
  // On crée le nouvel user et on l'enregistre en BDD
  let newUser = new userModel ({
    userName: req.body.userName, 
    userEmail: req.body.userEmail, 
    userPassword:hash,
    });  
            
  let user = await newUser.save(); 
  //on renvoie au front 
  if (user) { 
    error.push('ok'); 
  } else { 
    error.push("L'utilisateur n'a pas pu être enregistré");
  }
  res.json({error});
} else {
  error.push('Email déjà enregistré');
  res.json({error} );
}
});

router.post('/sign-in', async function (req,res,next){
  let error = [];
  if (   req.body.email === ''
      || req.body.password === ''){
    error.push('All fields must be completed.')
  }
  //si tous les champs sont remplis
  if (error.length === 0) { 
    //on regarde si le user existe 
    let userSearch=req.body.userEmail.toLowerCase();
    let user = await userModel.findOne({userEmail:userSearch});
    console.log('user',user)
    //si user =null le user n'existe pas 
    if (!user){
      error.push ("Cet utilisateur n'existe pas" );
      res.json ({error} );
    } else { 
      console.log('compare')
      // si le user existe on valide qu'il a bien le bon password 
      if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {
        error.push('ok')
        res.json ({error});
      } else {
        error.push('Mauvais password');
        res.json ( {error} );
      } 
    }     
  }
});

router.get ('/logout', function (req,res,next){
  req.session.destroy();
  res.redirect('/');      
})

module.exports = router;
