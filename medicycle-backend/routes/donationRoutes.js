const router = require("express").Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// ADD DONATION
router.post("/", auth, (req, res) => {
  const { recipient, medicine_name, quantity } = req.body;
  const userId = req.user.id;

  // 1️⃣ Check available quantity
  db.query(
    "SELECT * FROM medicines WHERE name = ?",
    [medicine_name],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.status(404).json({ msg: "Medicine not found" });

      const med = result[0];

      if (med.quantity < quantity) {
        return res.status(400).json({ msg: "Not enough stock" });
      }

      // 2️⃣ Reduce stock
      db.query(
        "UPDATE medicines SET quantity = quantity - ? WHERE id = ?",
        [quantity, med.id],
        (err) => {
          if (err) return res.status(500).json(err);

          // 3️⃣ Insert donation
          db.query(
            "INSERT INTO donations (donor_id, recipient, medicine_name, quantity) VALUES (?, ?, ?, ?)",
            [userId, recipient, medicine_name, quantity],
            (err) => {
              if (err) return res.status(500).json(err);

              res.json({ msg: "Donation successful" });
            }
          );
        }
      );
    }
  );
});

// GET DONATIONS
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM donations WHERE donor_id=?",
    [req.user.id],
    (err, result) => {
      res.json(result);
    }
  );
});

module.exports = router;