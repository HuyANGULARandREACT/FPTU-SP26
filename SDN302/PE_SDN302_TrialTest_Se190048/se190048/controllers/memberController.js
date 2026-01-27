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
