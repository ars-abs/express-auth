import express from 'express';
import config from './.config';
import cors from 'cors';
import { expressAuth } from '../dist';
import cookieParser from 'cookie-parser';

process.env.PORT = 1234;
process.env.URL = 'http://localhost';
process.env.JWTSECRET = 'secretstring';

const app = express();

app.use(cors({ origin: '*' }));
app.use(cookieParser());
const context = { app, config };

app.get('/login', (req, res) => {
	res.send('Login Page, please login');
});
expressAuth(context);
app.get('/', (req, res) => {
	res.json({ user: req.user });
});
const { PORT } = process.env;

app.listen(PORT);
