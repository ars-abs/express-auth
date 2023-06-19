import 'module-alias/register';
import enrichContext from './enrichContext';
import setupRequestParsers from './setup/setupRequestParsers';
import setupAuthFlows from './setup/setupAuthFlows';
import setupLogout from './setup/setupLogout';
import setupRenewTokens from './setup/setupRenewTokens';
import buildVerifier from './setup/buildVerifier';
import { runSteps } from './help[ers';

const expressAuth = (context) => {
	runSteps([
		setupRequestParsers,
		setupAuthFlows,
		setupLogout,
		setupRenewTokens,
	], enrichContext(context));

	return buildVerifier();
};

export { expressAuth };
