const router = require("express").Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// ADD TO CART
router.post("/", auth, (req, res) => {
  const { medicine_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (user_id, medicine_id, quantity) VALUES (?, ?, ?)",
    [req.user.id, medicine_id, quantity],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Added to cart" });
    }
  );
});

// GET CART
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT c.id, m.name, c.quantity FROM cart c JOIN medicines m ON c.medicine_id = m.id WHERE c.user_id=?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// DELETE FROM CART
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM cart WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Removed" });
  });
});

module.exports = router;