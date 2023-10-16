const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.SECERT_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({message: "No token provided"});
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({message: "Failed to authenticate token"});
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
