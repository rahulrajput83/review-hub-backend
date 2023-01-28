

const verify = (req, res, next) => {
    const token = req.headers['access-token'];
    if(!token) {
        return res.status(403).send({message: 'No Token Provided!'})
    }
    next();
}

module.exports = verify;