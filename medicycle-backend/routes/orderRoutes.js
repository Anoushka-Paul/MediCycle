const router = require("express").Router();
const db = require("../config/db");

// ✅ CREATE ORDER
router.post("/", (req, res) => {
  const { medicine_id, quantity } = req.body;

  if (!medicine_id || !quantity) {
    return res.status(400).json({ msg: "Missing data" });
  }

  db.query(
    "INSERT INTO orders (medicine_id, quantity) VALUES (?, ?)",
    [medicine_id, quantity],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Order created", id: result.insertId });
    }
  );
});

// ✅ GET ORDERS (IMPORTANT JOIN)
router.get("/", (req, res) => {
  db.query(
    `SELECT 
        o.id,
        m.name,
        o.quantity,
        o.status
     FROM orders o
     JOIN medicines m ON o.medicine_id = m.id
     ORDER BY o.id DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

module.exports = router;