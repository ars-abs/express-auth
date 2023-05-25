import express from 'express';
import config from '../config';
import cors from 'cors';
import expressAuth from '../src';

process.env.PORT = 1234;
const { PORT } = process.env;

process.env.URL = `http://localhost:${ PORT }`;
const app = express();

app.use(cors({ origin: '*' }));

expressAuth({ app, config });

app.get('/protected', (req, res) => {
	res.json({ user: req.user });
});
app.listen(PORT);
