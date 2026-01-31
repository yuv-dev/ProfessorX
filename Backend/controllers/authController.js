const { googleLogin } = require("../services/googleLoginService");
const { initializeProgress, recordLogin } = require("./globalProgressController");

//google Authentication and User Creation logic
const googleAuthController = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: "Credential token is required" });
    }
    const { token, user } = await googleLogin(credential);

    // 3. Set HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await recordLogin(user._id);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const User = require("../models/userModel");

const restoreSessionController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ user: null });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Restore session error:", error);
    res.status(401).json({ user: null });
  }
};

// Logout User
const logoutController = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res.json({ success: true });
};

module.exports = {
  googleAuthController,
  restoreSessionController,
  logoutController,
};
