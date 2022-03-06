import Category from './category.js';
import Author from './author.js';
import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const bookSchema = new Schema({
    pages: {type: Number, required: true},
    name: {type: String, required: true},
    language: {type: String},
    category: {type: String},
    author: {type: String},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true}
});

const Book = model('Book', bookSchema);
export default Book;