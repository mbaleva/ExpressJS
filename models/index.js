import mongoose from 'mongoose';
import Author from './author.js';
import Book from './book.js';
import Category from './category.js';
import Report from './report.js';

const connectionString = 'mongodb://localhost:27017/Bookshop';


async function initializeDb() {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default initializeDb;