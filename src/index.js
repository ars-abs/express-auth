import passport from 'passport';
import setupVerifier from './setup/setupVerifier';
import enrichContext from './enrichContext';
import setupAuthFlows from './setup/setupAuthFlows';
import setupLogout from './setup/setupLogout';
import setupRenewTokens from './setup/setupRenewTokens';
import setupRequestParsers from './setup/setupRequestParsers';

const expressAuth = (context) => {
	const enrichedContext = enrichContext(context);
	const { app } = enrichedContext;

	setupRequestParsers(enrichedContext);
	setupAuthFlows(enrichedContext);
	setupVerifier();
	setupLogout(enrichedContext);
	setupRenewTokens(enrichedContext);
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export { expressAuth };
