const { hash, compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/user");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, username, email, password } = req.body;

      if (!name || !username || !email || !password)
        throw { name: "invalid input" };

      const userEmail = await User.findOne({ email });

      if (userEmail || userEmail !== null)
        throw { name: "conflict", msg: "email is already use" };

      const userUsername = await User.findOne({ username });

      if (userUsername || userUsername !== null)
        throw { name: "conflict", msg: "username is already use" };

      await User.create({
        name,
        username,
        email,
        password: hash(password),
        role: "user",
      });

      res.status(201).json({ msg: "success register" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, username, password } = req.body;

      if (!password) throw { name: "invalid_credentials" };

      const user =
        (await User.findOne({ email })) || (await User.findOne({ username }));

      if (!user) throw { name: "invalid_credentials" };

      const validate = compare(password, user.password);

      if (!validate) throw { name: "invalid_credentials" };

      const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
