const db = require("../config/db");

exports.addMedicine = (req, res) => {
  const { name, description, quantity, expiry_date } = req.body;
  const donor_id = req.user.id;

  db.query(
    "INSERT INTO medicines (name, description, quantity, expiry_date, donor_id) VALUES (?, ?, ?, ?, ?)",
    [name, description, quantity, expiry_date, donor_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Medicine added" });
    }
  );
};

exports.getMedicines = (req, res) => {
  db.query("SELECT * FROM medicines", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};