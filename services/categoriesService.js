import Category from '../models/category.js';

const create = async (name, description) => {
    return Category.create({ name: name, description: description });
};
const byid = async (id) => {
    return Category.findById(id);
}
const deleteById = async (id) => {
    await Category.findByIdAndDelete(id);
}
const updateById = async (id, category) => {
    await Category.findByIdAndUpdate(id, category);
}

const categories = {
    create,
    byid,
    deleteById,
    updateById,
};
export default categories;