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
const getAll = async () => {
    const arr = [];
    await (await Author.find({})).forEach((x) => {
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
    let author = await Author.findById(id);
    obj.name = author.name;
    obj.id = author._id.toString();
    return obj;
}
const actions = {
    create,
    getById,
    deleteById,
    updateAuthor,
    getAll,
    getForBook,
};
export default actions;