const User = require("../users/model");
const { StatusCodes } = require("http-status-codes");

const customAPI = require("../../../errors");
const { createJWT, createTokenUser } = require("../../../utils");

const signup = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    const result = new User({ email, password, name, role });

    await result.save();

    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new customAPI.BadRequestError("please provide email and password");
    }

    const result = await User.findOne({ email: email });

    if (!result) {
      throw new customAPI.UnauthorizedError("invalid credentials");
    }

    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new customAPI.UnauthorizedError("no match password");
    }

    const token = createJWT({ payload: createTokenUser(result) });

    res.status(StatusCodes.OK).json({ data: { token } });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
};
