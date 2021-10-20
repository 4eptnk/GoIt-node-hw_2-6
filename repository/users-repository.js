const User = require('../model/user-model');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const createUser = async (options) => {
    const user = new User(options);
    return await user.save();
  };

  const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
  };

module.exports = {
    findByEmail,
    findById,
    createUser,
    updateToken,
}