const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: `invalid token` };

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload._id);

    if (!user) throw { name: `invalid token` };

    req.user = {
      _id: user._id,
      email: user.email,
      username: user.username,
      name: user.name,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
