const User = require('../model/user-model');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const findUserByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const createUser = async (options) => {
    const user = new User(options);
    return await user.save();
  };

  const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
  };

const updateTokenVerify = async (id, isVerified, verifyToken) => {
    return await User.updateOne({ _id: id }, { isVerified, verifyToken });
};

const updateAvatar = async (id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar });
};

module.exports = {
    findByEmail,
    findById,
    createUser,
    updateToken,
    updateAvatar,
    updateTokenVerify,
    findUserByVerifyToken,
}