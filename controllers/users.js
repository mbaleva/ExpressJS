import { Router } from 'express';

const router = Router();

const users = {
    login: {
        get: async (req, res) => {
            res.render('login');
        }
    },
    register: {},
    logout: {}
};