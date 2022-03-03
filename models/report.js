import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const reportSchema = new Schema({
    name: {type: String, required: true},
    subject: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true},
});

const Report = model('Report', reportSchema);
export default Report;