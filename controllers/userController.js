const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Controller for user login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser || existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller for user signup
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      data: {
        userId: newUser.id,
        email: newUser.email,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error! Something went wrong." });
  }
};
