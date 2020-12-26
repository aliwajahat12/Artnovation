const jwt= require('jsonwebtoken')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if(user) return res.status(400).send({
            message: 'User already exists'
        });

        const { 
            firstName,
            lastName,
            userID,
            email,
            password
        } = req.body;
        const _user = new User({
            firstName,
            lastName,
            userID: Math.random().toString(),
            email,
            password
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).send({
                    message: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).send({
                    message: 'User created successfully'
                });
            }
        });
    });
}

exports.signin = (req, res) =>{
    User.findOne({ email: req.body.email }).exec((error, user) => { 
        if(error) return res.status(400).send({ error });
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id }, process.env.JWT_CODE, { expiresIn: '1h' });
                const { _id, email, role, fullName } = user;
                res.status(200).send({
                    token,
                    user: {
                        _id, fullName, email, role
                    }
                }); 
            }
        }else{
            return res.status(400).send({message: 'Something went wrong'});
        }
    });
}

const isAuth = (req, res, next) => {
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
module.exports= isAuth;