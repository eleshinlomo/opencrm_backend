const express = require('express')
const User  = require('../models/user')
const bcrypt = require('bcrypt')
const middleware = require('../middleware')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



let messager = []
exports.message = (req, res)=>{
    messager.push("elephant")
    res.json({msg: messager})
}


// exports.createUser = ((req, res)=>{
    
    
//     const {email, firstname, lastname, password} = req.body
//     User.findOne({email})
//     .then((email)=>{
//             if(email){
//                 messager.push("error with email")
//                 console.log("email error")
//                 res.json({msg: messager})
//             }else{
//                 const user = new User(req.body)
//                 bcrypt.genSalt(10, (err, salt) => 
//                 bcrypt.hash(user.password, salt, (err, hash)=>{
//                     if(err) throw err;
//                     user.password = hash;
//                     console.log(user)
//                     user.save()
//                     res.json({msg: "You are now registered"})
        
// }))
//                 }
//             })
    
//   }) 

  exports.getDashboard = (req, res)=>{
    User.find().sort({Posted: -1})
    .then((data)=>{
        if(!data){
            console.log("no data found")
        }else{
           return res.json(data)
        }
    })
    .then((result)=>{
        console.log(result)
    })
  }

  

exports.createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const user = new User({
      email,
      firstname,
      lastname,
      password: hashedPassword
    });
    console.log(user)
    await user.save();
    

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Could not create user'
    });
  }
};




exports.login = (req, res, next) => {

    passport.use(
        new LocalStrategy(
          {
            usernameField: 'email',
            passwordField: 'password'
          },
          async (email, password, done) => {
            try {
              const user = await User.find({ email, password });
              
      
              if (!user) {
                return done(null, false, { message: 'Invalid email or password' });
              }
              
              const isMatch = await user.comparePassword(password);
      
              if (!isMatch) {
                return done(null, false, { message: 'Invalid email or password' });
              }
      
              return done(null, user);
            } catch (error) {
              return done(error);
            }
          }
        )
      );
      
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
      
          if (!user) {
            return done(null, false);
          }
      
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      });

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message
      });
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user
      });
    });
  })(req, res, next);
};



