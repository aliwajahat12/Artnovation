const jwt= require('jsonwebtoken')

exports.isAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
    console.log("req",req.headers.authorization)
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      if (!token) {
        res.status(404).send({message:'Authentication failed!'});
      }
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
            console.log("token ", token)
          }
        }
      );
    } 
    else {
      res.status(401).send({ message: 'No Token' });
    }
    console.log("re.user",req.user)
    console.log("Authorization",authorization)
  };
