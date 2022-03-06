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
const getAll = async () => {
    const arr = [];
    await (await Category.find({})).forEach((x) => {
        arr.push({
            name: x.name,
            id: x._id.toString(),
        });
    });
    return arr;
}
const getForBook = async (id) => {
    let obj = {
        name: '',
        id: '',
    };
    let category = await Category.findById(id);
    obj.name = category.name;
    obj.id = category._id.toString();
    return obj;
}

const categories = {
    create,
    byid,
    deleteById,
    updateById,
    getAll,
    getForBook,
};
export default categories;