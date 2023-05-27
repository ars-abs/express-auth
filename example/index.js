import express from 'express';
import config from './.config';
import cors from 'cors';
import expressAuth from '../src';
import cookieParser from 'cookie-parser';

process.env.PORT = 1234;
const { PORT } = process.env;

process.env.URL = `http://localhost:${ PORT }`;
const app = express();

app.use(cors({ origin: '*' }));
app.use(cookieParser());

app.get('/login', (req, res) => {
	res.send('Login Page, please login');
});
expressAuth({ app, config });
app.get('/', (req, res) => {
	res.json({ user: req.user });
});
app.listen(PORT);
