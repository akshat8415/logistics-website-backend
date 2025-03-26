const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create a new order
router.post("/create", async (req, res) => {
  try {
    const { trackingId, status, location, customerName } = req.body;
    if (!trackingId || !status || !customerName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingOrder = await Order.findOne({ trackingId });
    if (existingOrder) {
      return res.status(400).json({ error: "Tracking ID already exists" });
    }

    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by tracking ID
router.get("/:trackingId", async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status and location
router.put("/update/:trackingId", async (req, res) => {
  try {
    const { status, location } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const order = await Order.findOneAndUpdate(
      { trackingId: req.params.trackingId },
      { status, location },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
