require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Change this to your frontend URL in production
  credentials: true, // Allow cookies, authentication headers
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Logistics API is running...");
});

// ✅ Routes
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
