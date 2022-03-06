import { Router } from 'express';
import authorsService from '../services/authorService.js';
import obj from '../middlewares/auth.js';

const router = Router();

const author = {
    create: {
        get: async (req, res) => {
            res.render('add');
        },
        post: async (req, res) => {
            const name = req.body.name;
            const biography = req.body.biography;
            const imageUrl = req.body.imageUrl;
            const address = req.body.address;

            const author = await authorsService.create(name, biography, imageUrl, address);
            res.redirect(`/authors/byid/${author._id.toString()}`);
        }
    },
    author: {
        get: async (req, res) => {
            const id = req.params.id;
            const author = await authorsService.getById(id);
            res.render('author', author);
        }   
    },
    delete: {
        get: async (req, res) => {
            const id = req.params.id;
            await authorsService.deleteById(id);
            res.redirect('/');
        }
    },
    edit: {
        get: async (req, res) => {
            const id = req.params.id;
            const author = await authorsService.getById(id);
            res.render('editAuthor', author);
        },
        post: async (req, res) => {
            const id = req.params.id;
            const author = {
                id: id,
                name: req.body.name,
                biography: req.body.biography,
                address: req.body.address,
                imageUrl: req.body.imageUrl,
            }
            await authorsService.updateAuthor(id, author);
            res.redirect('/');
        }
    }
};

router.get('/create', obj.authorizeAdmin ,author.create.get);
router.post('/create', obj.authorizeAdmin,author.create.post);
router.get('/byid/:id', author.author.get);
router.get('/delete/:id', obj.authorizeAdmin, author.delete.get);
router.get('/edit/:id', obj.authorizeAdmin, author.edit.get);
router.post('/edit/:id', obj.authorizeAdmin, author.edit.post);

export default router;