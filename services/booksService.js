import Book from '../models/book.js';

const create = async (object) => {
    return await Book.create({
        name: object.name,
        pages: object.pages,
        imageUrl: object.imageUrl,
        language: object.language,
        category: object.category,
        author: object.author,
        description: object.description,
        price: object.price,
    });
}
const getAll = async () => {
    const arr = [];
    await (await Book.find({})).forEach(book => {
        arr.push({
            id: book._id.toString(),
            name: book.name,
            price: book.price,
            imageUrl: book.imageUrl,
        });
    });
    return arr;
}
const getById = async (id) => {
    return await Book.findById(id);
}
const deleteById = async (id) => {
    await Book.findByIdAndDelete(id);
}
const update = async(id, book) => {
    await Book.findByIdAndUpdate(id, book);
}
const obj = {
    create,
    getAll,
    getById,
    deleteById,
    update,
};
export default obj;