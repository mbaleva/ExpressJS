import { Router } from 'express';
import reportsService from '../services/reportsService.js';
import obj from '../middlewares/auth.js';

const router = Router();

const home = {
    async get (req, res) {
        res.locals.isLoggedIn = req.session.isLoggedIn;
        res.render('index');
    }
};

const contacts = {
    create: {
        async get (req, res) {
            res.render('contacts');
        },
        async post (req, res) {
            console.log('In post method');
            console.log(req.body);
            const result = await reportsService.create(
                req.body.name,
                req.body.email,
                req.body.subject,
                req.body.description);
            res.redirect('/');
        }
    },
    details: {
        get: async (req, res) => {
            const id = req.params.id;
            const report = await reportsService.getById(id);
            res.render('reportDetails', report);
        }
    },
    delete: {
        get: async (req, res) => {
            const id = req.params.id;
            await reportsService.deleteById(id);
            res.redirect('/');
        }
    },
    all: {
        get: async (req, res) => {
            const reports = await reportsService.getAll();
            for(let report of reports) {
                report._id = report._id.toString();
            }
            res.locals.reports = reports;
            res.render('allReports');
        }
    }
}
router.get('/', home.get);

//contacts
router.get('/contacts', contacts.create.get);
router.post('/contacts', contacts.create.post);

router.get('/contacts/byid/:id', obj.authorizeAdmin, contacts.details.get);

router.get('/contacts/delete/:id', obj.authorizeAdmin, contacts.delete.get);

router.get('/contacts/all', obj.authorizeAdmin, contacts.all.get);
export default router;