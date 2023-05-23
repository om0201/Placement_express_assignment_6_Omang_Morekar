const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    let token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "SECRETKEY");

    if (decoded) {
      const username = decoded.username;

      const persistedUser = users.find((user) => user.username == username);

      if (persistedUser) {
        next();
      } else {
        res.json({ success: false, message: "User does not exist" });
      }
    } else {
      res.status(401).json({ message: "No authorization headers found" });
    }
  } else {
    res.status(401).json({ message: "No authorization headers found" });
  }
}

module.exports = authenticate;
