import { Router } from 'express';
import reportsService from '../services/reportsService.js';

const router = Router();

const home = {
    async get (req, res) {
        res.render('index');
    }
};

const contacts = {
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
    }
}
router.get('/', home.get);

//contacts
router.get('/contacts', contacts.get);
router.post('/contacts', contacts.post);
export default router;