const express = require("express");
const connectDB = require("./database");
const userRoutes = require("./routes/app");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoutes);
app.set("view engine", "ejs");
app.use(express.static("public"));

connectDB();

app.get("/", (req, res) => {
  res.redirect("/api/tasks/new");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
