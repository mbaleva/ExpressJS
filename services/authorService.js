import Author from '../models/author.js';

const create = async (name, biography, imageUrl, address) => {
    return Author.create({ name: name, biography: biography, imageUrl: imageUrl, address: address });
}
const getById = async (id) => {
    return Author.findById(id);
}
const deleteById = async (id) => {
    await Author.findByIdAndDelete(id);
}
const updateAuthor = async (id, author) => {
    await Author.findByIdAndUpdate(id, author);
}
const actions = {
    create,
    getById,
    deleteById,
    updateAuthor,
};
export default actions;