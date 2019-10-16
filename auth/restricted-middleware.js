// const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token) {
    //check that token is valid
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        //foul play
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        //token is good
        req.username = decodedToken.username;
        next();
      }
    })
  }

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};
