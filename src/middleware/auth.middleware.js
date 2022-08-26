const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Auth error'});
        }
        req.person = jwt.verify(token, secretKey);
        next();
    } catch (e) {
        return res.status(401).json({message: 'Auth error'});
    }
}
