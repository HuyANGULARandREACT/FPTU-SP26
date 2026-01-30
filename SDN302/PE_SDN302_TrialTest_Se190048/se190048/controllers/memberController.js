const Members = require("../models/member");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    const findAcc = await Members.findOne({ username });
    if (!findAcc) {
      return res.status(400).json("Username not found!");
    }
    const isMatch = await bcrypt.compare(password, findAcc.password);
    if (!isMatch) {
      return res.status(400).json({ messeage: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      {
        memberId: findAcc._id,
        username: findAcc.username,
      },
      jwtSecret,
      { expiresIn: "1h" },
    );
    res.json({ success: true, accessToken });
  } catch (error) {
    res.status(500).json({ messeage: error.messeage });
  }
};

exports.showSigninPage = async (req, res) => {
  try {
    res.render("signin", {
      message: req.session.message,
      username: req.session.username,
    });
  } catch (error) {
    res.status(500).json({ messeage: error.messeage });
  }
};
exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Members.findOne({ username });

    if (!user) {
      req.session.message = "Invalid username or password";
      return res.redirect("/auth/signin");
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.username = username;
      req.session.message = null;
      return res.redirect("/view/sections");
    } else {
      req.session.message = "Invalid username or password";
      return res.redirect("/auth/signin");
    }
  } catch (error) {
    console.error("Login Error:", error);
    req.session.message = "An error occurred during login. Please try again.";
    return res.redirect("/auth/signin");
  }
};
