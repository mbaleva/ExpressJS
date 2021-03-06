import User from '../models/user.js';

const register = async (name, username, password, email) => {
    let user = await User.find({ name: name, username: username  })[0];
    console.log(user);
    if(user != null) {
        throw new Error('User with this username already exists.');
    }
    await User.create({ name: name, username: username, password: password, email: email });
};
const findByEmail = async (email) => {
    return User.findOne({ email: email });
}
const isAdminByEmail = async (email) => {
    let user = await User.findOne({ email: email });
    return user.roles.includes('Administrator');
};
const exports = {
    register,
    findByEmail,
    isAdminByEmail,
};
export default exports;