const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const verifyToken = (req, res, next) => {
  //Issue is here
  const token = req.cookies.token; // Get token from cookies
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded; // Set req.user to decoded payload (includes id)
    next();
  });
};

module.exports = verifyToken;
