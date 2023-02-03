const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.headers['access-token'];
    if(!token) {
        return res.status(403).send({message: 'No Token Provided!'})
    }
    jwt.verify(token, process.env.key, (err, decoded) => {
        if(err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        /* console.log(decoded.user._id) */
        req.user = decoded.user
        next();
    })
}

module.exports = verify;