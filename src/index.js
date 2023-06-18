import passport from 'passport';
import saveLogin from './saveLogin';
import setupVerifier from './setup/setupVerifier';
import renewTokens from './renewTokens';
import logout from './logout';
import enrichContext from './enrichContext';
import setupAuthFlows from './setup/setupAuthFlows';

const expressAuth = (context) => {
	const enrichedContext = enrichContext(context);
	const { app, config: { auth: { logoutURL }}} = enrichedContext;

	setupAuthFlows(enrichedContext);
	setupVerifier();

	app.get(`${ logoutURL }`, logout);
	app.get(
		'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
	);
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export { expressAuth };
