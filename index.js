const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticate = require("./authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

global.users = [
  {
    username: "rahul",
    password: "password",
  },
];

app.post("/register", (req, res) => {
  const { name, email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.json({ success: false, message: "Please match the password" });
  }

  const user = users.find((user) => user.username === username);

  if (!user) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    users.push({
      name,
      email,
      username,
      password: hash,
    });

    res.json({ success: true, message: "Successfully registered!" });
  } else {
    res.json({
      success: false,
      message: "username existed. Please try again.",
    });
  }
});

// DESCRIPTION  - LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username == username && user.password == password
  );

  if (user) {
    // generate the json web token
    const token = jwt.sign({ username: user.username }, "SECRETKEY");

    res.json({ success: true, token: token });
  } else {
    // response with not authenticated
    res.json({ success: false, message: "Not authenticated" });
  }
});

app.get("/data", authenticate, (req, res) => {
  res.json(users);
});

app.listen(8000, () => {
  console.log(`Server running on port 8000`);
});
