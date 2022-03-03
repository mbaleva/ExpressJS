import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const authorSchema = new Schema({
    name: { type: String },
    biography: {type: String},
    imageUrl: { type: String },
    born: {type: Date},
    address: {type: String}
})

const Author = model('Author', authorSchema);
export default Author;