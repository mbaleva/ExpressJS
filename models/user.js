import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true },
    roles: { type: [], required: false }
});
const User = model('User', userSchema);
export default User;