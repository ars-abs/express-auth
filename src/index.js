import passport from 'passport';
import saveLogin from './saveLogin';
import setupVerifier from './setup/setupVerifier';
import renewTokens from './renewTokens';
import enrichContext from './enrichContext';
import setupAuthFlows from './setup/setupAuthFlows';
import setupLogout from './setup/setupLogout';

const expressAuth = (context) => {
	const enrichedContext = enrichContext(context);
	const { app } = enrichedContext;

	setupAuthFlows(enrichedContext);
	setupVerifier();
	setupLogout(enrichedContext);
	app.get(
		'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
	);
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export { expressAuth };
