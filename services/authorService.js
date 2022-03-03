import Author from '../models/author.js';

const create = async (name, biography, imageUrl, address) => {
    return Author.create({ name: name, biography: biography, imageUrl: imageUrl, address: address });
}
const getById = async (id) => {
    return Author.findById(id);
}
const actions = {
    create,
    getById
};
export default actions;