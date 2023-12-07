const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports.register = async (req, res) => {
  try {
    console.log("body", req.body);
    const { email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    console.log("user registered");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assuming 'username' is the unique identifier for the user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // const token = jwt.sign({ userId: user._id }, "todo123", {
    //   expiresIn: "1h",
    // });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // You can adjust the expiration time
    });

    //send user data wirhaut pass

    const sanitizedUser = {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
      // Add any other non-sensitive properties you want to include
    };

    res.status(200).json({ token, user: sanitizedUser, succes: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", succes: false });
  }
};

const generateToken = function (user) {
  const payload = {
    userId: user.id,
    // Add more user information to the payload as needed
  };

  return jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: "1h" });
};
