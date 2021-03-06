const jwt = require("jsonwebtoken");
const config = require("config");

let jwtSecret;
if (process.env.jwtSecret) {
  jwtSecret = process.env.jwtSecret;
} else {
  jwtSecret = config.get("jwtSecret");
}

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, no auth!" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token!" });
  }
};
