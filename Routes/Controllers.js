const express = require('express')
const User  = require('../models/user')
const bcrypt = require('bcrypt')
const middleware = require('../middleware')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




exports.getUser = (req, res)=>{
    User.find()
    .then((data)=>{
        if(!data){
            console.log("no data found")
        }else{
           return res.json({data: data})
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



passport.use(
            new LocalStrategy(
              {
                usernameField: 'email',
                passwordField: 'password'
              },
              async (email, password, done) => {
                try {
                  const user = await User.findOne({ email});
                  
          
                  if (!user) {
                    return done(null, false, { message: 'User does not exist' });
                  }
                  
                  const isMatch = await bcrypt.compare(password, user.password);
          
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
    })






exports.login = (req, res, next) => {
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
  
 
  
  exports.loginAuth = (req, res, next)=>{
    if (req.isAuthenticated()) {
      return res.status(400).json({
        success: false,
        message: 'You are already logged in'
      });
    }
  };
  


exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  };
  


