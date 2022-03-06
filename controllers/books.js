import { Router } from 'express';
import obj from '../middlewares/auth.js';
import categoriesService from '../services/categoriesService.js';
import authorsService from '../services/authorService.js';
import booksService from '../services/booksService.js';

const router = Router();

const books = {
    create: {
        get: async (req, res) => {
            const categories = await categoriesService.getAll();
            const authors = await authorsService.getAll();
            res.locals.categories = categories;
            res.locals.authors = authors;
            res.render('addBook');
        },
        post: async (req, res) => {
            const book = {
                name: req.body.name,
                pages: req.body.pages,
                imageUrl: req.body.imageUrl,
                language: req.body.language,
                category: req.body.category,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
            }
            await booksService.create(book);
            res.redirect('/');
        },
    },
    list: {
        get: async (req, res) => {
            const books = await booksService.getAll();
            res.locals.books = books;
            res.render('booksList');
        }
    },
    byid: {
        get: async (req, res) => {
            const id = req.params.id;
            const book = await booksService.getById(id);
            res.locals.data = {
                book: {
                    id: book._id.toString(),
                    name: book.name,
                    pages: book.pages,
                    language: book.language,
                    price: book.price,
                    description: book.description,
                    imageUrl: book.imageUrl,
                    id: book._id.toString(),
                },
                author: await authorsService.getForBook(book.author),
                category: await categoriesService.getForBook(book.category),
            };
            res.render('bookById');
        }
    },
    delete: {
        get: async(req, res) => {
            const id = req.params.id;
            await booksService.deleteById(id);
            res.redirect('/');
        }
    },
    edit: {
        get: async (req, res) => {
            const id = req.params.id;
            let book = await booksService.getById(id);
            book._id = book._id.toString();
            res.render('editBook', book);
        },
        post: async (req, res) => {
            const id = req.params.id;
            const book = {
                name: req.body.name,
                language: req.body.language,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
            };
            await booksService.update(id, book);
            res.redirect('/');
        }
    }
}
router.get('/create', obj.authorizeAdmin, books.create.get);
router.post('/create', obj.authorizeAdmin, books.create.post);

router.get('/list', books.list.get);

router.get('/byid/:id', books.byid.get);

router.get('/delete/:id', obj.authorizeAdmin, books.delete.get);

router.get('/edit/:id', obj.authorizeAdmin, books.edit.get);
router.post('/edit/:id', obj.authorizeAdmin, books.edit.post);

export default router;