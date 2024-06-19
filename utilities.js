// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(401);
//     req.user = user;
//     next();
//   });
// }
// module.exports = {
//   authenticateToken,
// };

// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401); // if there isn't any token

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // if token is invalid
//     req.user = user;
//     next();
//   });
// }

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Authorization Header:", authHeader); // Debugging line
  console.log("Token:", token); // Debugging line

  if (token == null) {
    console.log("No token provided"); // Debugging line
    return res.sendStatus(401); // if there isn't any token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err); // Debugging line
      return res.sendStatus(403); // if token is invalid
    }
    console.log("Token verified, user:", user); // Debugging line
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
