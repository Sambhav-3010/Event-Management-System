const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const connectDB = require("./database");
const userRoutes = require("./routes/app");
const user = require("./routes/userRoutes");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
connectDB();
function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.redirect("/login"); // Redirect to login if token is missing
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, "secretkeyappearshere");
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.redirect("/login");
  }
}
app.use("/api", userRoutes);
app.use("/user", user);

app.get("/", isAuthenticated, (req, res) => {
  res.render("taskForm");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
