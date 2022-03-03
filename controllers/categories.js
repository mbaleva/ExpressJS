import { Router } from 'express';
import categories from '../services/categoriesService.js';

const router = Router();

const category = {
    create: {
        get: async (req, res) => {
            res.render('create');
        },
        post: async (req, res) => {
            const result = await categories.create(req.body.name, req.body.description);
            res.redirect(`/byid/${result._id.toString()}`);
        }
    },
    byid: {
        get: async (req, res) => {
            let category = await categories.byid(req.params.id);
            res.render('byid', category);
        }
    }
};


router.get('/create', category.create.get);
router.post('/create', category.create.post);
router.get('/byid/:id', category.byid.get);

export default router;