import * as express from 'express';
import * as methodOverride from 'method-override';
import 'express-async-errors';
import {engine} from 'express-handlebars'
import * as session from 'express-session';
import {join} from "path";
import { handlebarsHelpers } from './utils/handlebars-helpers';
import {handleError} from "./utils/errors";

const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session)
const redisClient = new Redis();

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'secret$%^134',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie
            maxAge: 1000 * 60 * 60 * 12 // session max age in miliseconds
        }
    })
)

app.use(express.static(join(__dirname,'public')));
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers, // Dodatkowe funkcjonalności, które chcemy dodać do Handlebarsów
}));
app.set('view engine', '.hbs');





app.get('/', function (req, res) {
    res.render('home/start')
})

app.use(handleError);

app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3000');
});