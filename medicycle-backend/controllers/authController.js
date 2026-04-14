const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashed, role],
    (err) => {
      if (err) {
        console.log(err); // 👈 IMPORTANT (see error in terminal)
        return res.status(500).json({ msg: "DB error" });
      }
      res.json({ msg: "User registered" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length === 0)
      return res.status(400).json({ msg: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user.id }, "secretkey");

    res.json({ token, role: user.role });
  });
};