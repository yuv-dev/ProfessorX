const {
  GOOGLE_CLIENT_ID,
  JWT_SECRET,
} = require("../config/env");

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.googleLogin = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: GOOGLE_CLIENT_ID,
  });
  const { email, name, picture, sub: googleId } = ticket.getPayload();

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ name, email, googleId, picture });
  } else {
    user.name = name;
    user.googleId = googleId;
    user.picture = picture;
    await user.save();
  }
  console.log("Authenticated user:", user);
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return { token, user };
};
