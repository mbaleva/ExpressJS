import { Router } from 'express';
import authorsService from '../services/authorService.js';

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
            res.redirect(`/author/${author._id.toString()}`);
        }
    },
    author: {
        get: async (req, res) => {
            const id = req.params.id;
            const author = await authorsService.getById(id);
            res.render('author', author);
        }   
    }
};

router.get('/create', author.create.get);
router.post('/create', author.create.post);
router.get('/byid/:id', author.author.get);

export default router;