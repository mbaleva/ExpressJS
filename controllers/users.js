import { Router } from 'express';
import usersService from '../services/usersService.js';
import bcrypt from 'bcrypt';

const router = Router();

const users = {
    login: {
        get: async (req, res) => {
            res.render('login');
        },
        post: async (req, res) => {
            let user = await usersService.findByEmail(req.body.email);
            const hashResult = await bcrypt.compare(req.body.password, user.password); 
            if(hashResult) {
                console.log('>>> Cookie: ', req.session.cookie);
                req.session.user = { id: user._id, username: user.username, isAdmin: false };
                req.session.isLoggedIn = true;
                req.session.user.isAdmin = await usersService.isAdminByEmail(user.email);
                res.redirect('/');
            }
        }
    },
    register: {
        get: async (req, res) => {
            res.render('register');
        },
        post: async (req, res) => {
            const username = req.body.username;
            const name = req.body.name;
            const email = req.body.email;
            let password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            await usersService.register(name, username, password, email);
            res.redirect('/auth/login');
        }
    },
    logout: {
        get: async (req, res) => {
            req.session.user = null;
            req.session.isLoggedIn = false;
            console.log(req.session);
            res.redirect('/');
        }
    }
};

router.get('/login', users.login.get);
router.post('/login', users.login.post);

router.get('/register', users.register.get);
router.post('/register', users.register.post);

router.get('/logout', users.logout.get);

export default router;