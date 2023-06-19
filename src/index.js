import enrichContext from './enrichContext';
import setupRequestParsers from './setup/setupRequestParsers';
import setupAuthFlows from './setup/setupAuthFlows';
import setupLogout from './setup/setupLogout';
import setupRenewTokens from './setup/setupRenewTokens';
import buildVerifier from './setup/buildVerifier';

const expressAuth = (context) => {
	const enrichedContext = enrichContext(context);

	setupRequestParsers(enrichedContext);
	setupAuthFlows(enrichedContext);
	setupLogout(enrichedContext);
	setupRenewTokens(enrichedContext);

	return buildVerifier();
};

export { expressAuth };
