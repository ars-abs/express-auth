import { map } from '@laufire/utils/collection';
import passport from 'passport';
import saveLogin from './saveLogin';
import setupVerifier from './setup/setupVerifier';
import renewTokens from './renewTokens';
import logout from './logout';
import setupAuthFlow from './setup/setupAuthFlow';

const expressAuth = (context) => {
	const { app, config: { auth: { providers, logoutURL }}} = context;

	map(providers, (...props) => setupAuthFlow({ props, ...context }));
	setupVerifier();

	app.get(`${ logoutURL }`, logout);
	app.get(
		'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
	);
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export { expressAuth };
