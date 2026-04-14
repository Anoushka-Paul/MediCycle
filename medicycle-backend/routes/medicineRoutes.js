const router = require("express").Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// GET all
router.get("/", (req, res) => {
  db.query("SELECT * FROM medicines", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD
router.post("/", auth, (req, res) => {
  const { name, description, quantity, expiry_date } = req.body;
  const donor_id = req.user.id;

  db.query(
    "INSERT INTO medicines (name, description, quantity, expiry_date, donor_id) VALUES (?, ?, ?, ?, ?)",
    [name, description, quantity, expiry_date, donor_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Added" });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM medicines WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Deleted" });
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { name, description, quantity, expiry_date } = req.body;

  db.query(
    "UPDATE medicines SET name=?, description=?, quantity=?, expiry_date=? WHERE id=?",
    [name, description, quantity, expiry_date, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Updated" });
    }
  );
});

module.exports = router;