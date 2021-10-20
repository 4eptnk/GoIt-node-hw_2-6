const jwt = require('jsonwebtoken');
const Users = require("../repository/users-repository");
const { HttpCode } = require("../config/constants");
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res
    .status(HttpCode.CONFLICT)
    .json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is in use",
    });
  }

  try {
    const newUser = await Users.createUser({ name, email, password, subscription });
    return res
    .status(HttpCode.CREATED)
    .json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  
  if(user) {
    const isValidPassword = await user.isValidPassword(password);
    if(isValidPassword) {
      const id = user._id;
      const payload = { id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
      await Users.updateToken(id, token);
    
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { token },
      });
    }
  }
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  };

const logout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res
  .status(HttpCode.NO_CONTENT)
  .json({});
};

const current = async (req, res, next) => {
  try {
    if(req.user) {
      const { name, email } = req.user;
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        user: { name, email },
      });
    }
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
      
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  logout,
  current
};
