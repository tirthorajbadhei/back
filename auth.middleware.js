// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     const decoded = jwt.verify(token, "suvo");
//     if (decoded) {
//       next();
//     } else {
//       res.send("your are not authorized");
//     }
//   } else {
//     res.send("your are not authorized");
//   }
// };
// module.exports = { auth };
