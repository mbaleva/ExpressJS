import express from 'express';
import init from './models/index.js';
import { engine } from 'express-handlebars';
import session from 'express-session';
import router from './controllers/home.js';
import categories from './controllers/categories.js';
import authors from './controllers/author.js';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function start() {
    await init();
    app.engine('.hbs', engine({
        layoutsDir: './views/layouts',
        defaultLayout: 'main',
        extname: '.hbs',
    }));
    app.set('view engine', '.hbs');
    app.set('views',  [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'views/home'),
        path.join(__dirname, 'views/categories'),
        path.join(__dirname, 'views/authors'),
    ]);
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(express.static('public'));

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
    
    app.use('/', router);
    app.use('/category', categories);
    app.use('/authors', authors);
    app.listen(port, () => {
        console.log(`Server started. Listening on ${port} port`);
    });
}
start();