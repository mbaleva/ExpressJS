import Category from '../models/category.js';

const create = async (name, description) => {
    return Category.create({ name: name, description: description });
};
const byid = async (id) => {
    return Category.findById(id);
}

const categories = {
    create,
    byid
};
export default categories;