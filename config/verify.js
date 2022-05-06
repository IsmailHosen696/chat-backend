const jwt = require('jsonwebtoken');
const tokensecret = process.env.tokensecret

const verifytoken = async (req, res, next) => {
    const token = req.body.token
    await jwt.verify(token, tokensecret, async (err, decode) => {
        if (err) {
            res.status(400).json({ err: "token is not valid" })
        } else {
            req.user = decode
            next();
        }
    })
}
module.exports = verifytoken