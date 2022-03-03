import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {required: true, type: String},
    description: {required: true, type: String, maxlength: 1000, minlength: 50}
});


const Category = model('Category', categorySchema);
export default Category;