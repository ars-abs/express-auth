import { map } from '@laufire/utils/collection';
import passport from 'passport';
import setupProvider from './setupProvider';
import saveLogin from './saveLogin';
import setupVerifier from './setupVerifier';
import jwt from 'jsonwebtoken';
import User from './User';
import axios from 'axios';
import querystring from 'querystring';

const fetchTokens = async ({
	refreshToken, tokenURL, clientID, clientSecret,
}) => {
	const requestBody = querystring.stringify({
		grant_type: 'refresh_token',
		client_id: clientID,
		client_secret: clientSecret,
		refresh_token: refreshToken,
		scope: 'openid profile',
	});
	/* eslint-disable id-match, camelcase */
	const { data: { access_token, refresh_token, id_token }} = await axios.post(
		tokenURL, requestBody,
		{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
	);

	return {
		accessToken: access_token,
		idToken: id_token,
		refreshToken: refresh_token || refreshToken,
	};
	/* eslint-enable id-match, camelcase */
};

const refreshTokens = async (req) => {
	const { sub, iss } = jwt.decode(req.cookies.token);
	const {
		tokenURL, clientID, clientSecret,
	} = req.context.config.auth.providers[iss];
	const [{ refreshToken }] = await User
		.findAll({ where: { user: sub, iss: iss }});

	return fetchTokens({ refreshToken, tokenURL, clientID, clientSecret });
};

const renewTokens = async (req, res, next) => {
	!req.cookies.token && res.redirect('/login');
	req.user = await refreshTokens(req);
	next();
};
const logout = (req, res) => {
	res.clearCookie('token');
	res.redirect('/login');
};
const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};

const setupAuthFlow = ({ props: [value, provider], ...context }) => {
	const { app, config: { auth: { loginURL, callbackURL }}} = context;
	const props = { ...value, callbackURL: `${ process.env.URL }${ callbackURL }/${ provider }` };

	setupProvider({ ...context, data: { provider, props }});
	app.get(`${ loginURL }/${ provider }`, passport.authenticate(provider, { session: false, accessType: 'offline', prompt: 'consent' }));
	app.get(
		`${ callbackURL }/${ provider }`,
		passport.authenticate(provider, { session: false }),
		saveLogin,
		(req, res) => res.redirect('/')
	);
};

const expressAuth = (context) => {
	const { app, config: { auth: { providers, logoutURL }}} = context;

	app.use(includeContextToReq(context));
	map(providers, (...props) => setupAuthFlow({ props, ...context }));
	app.get(`${ logoutURL }`, logout);
	app.get(
		'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
	);
	setupVerifier();
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export default expressAuth;
