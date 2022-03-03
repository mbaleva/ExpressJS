import Category from './category.js';
import Author from './author.js';
import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const bookSchema = new Schema({
    pages: {type: Number, required: true},
    name: {type: String, required: true},
    language: {type: String},
    category: {type: Object},
    author: {type: Object},
    price: {type: Number, required: true}
});

const Book = model('Book', bookSchema);
export default Book;