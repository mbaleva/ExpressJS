import { Router } from 'express';
import categories from '../services/categoriesService.js';
import obj from '../middlewares/auth.js';

const router = Router();

const category = {
    create: {
        get: async (req, res) => {
            res.render('create');
        },
        post: async (req, res) => {
            const result = await categories.create(req.body.name, req.body.description);
            res.redirect(`/category/byid/${result._id.toString()}`);
        }
    },
    byid: {
        get: async (req, res) => {
            let category = await categories.byid(req.params.id);
            res.render('byid', category);
        }
    },
    delete: {
        get: async (req, res) => {
            const id = req.params.id;
            await categories.deleteById(id);
            res.redirect('/');
        }
    },
    edit: {
        get: async (req, res) => {
            const id = req.params.id;
            const category = await categories.byid(id);
            res.render('editCategory', category);
        },
        post: async (req, res) => {
            const id = req.params.id;
            const category = {
                id: id,
                name: req.body.name,
                description: req.body.description,
            };
            await categories.updateById(id, category);
            res.redirect('/');
        }
    }
};

router.get('/create', obj.authorizeAdmin, category.create.get);
router.post('/create', obj.authorizeAdmin, category.create.post);
router.get('/byid/:id', category.byid.get);
router.get('/delete/:id', obj.authorizeAdmin, category.delete.get);
router.get('/edit/:id', obj.authorizeAdmin, category.edit.get);
router.post('/edit/:id', obj.authorizeAdmin, category.edit.post);

export default router;