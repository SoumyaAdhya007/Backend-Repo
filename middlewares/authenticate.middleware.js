const jwt = require("jsonwebtoken");
require('dotenv').config()
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        const userID = decoded.userID;
        // console.log(decoded);
        req.body.userID = userID;
        next();
      } else {
        res.send(`Please Login`);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: "Invalid Token",
      });
    }
  } else {
    res.send(`Please Login`);
  }
};

module.exports = {
  authenticate,
};
