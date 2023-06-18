import { map } from '@laufire/utils/collection';
import setupAuthFlow from './setupAuthFlow';

const setupAuthFlows = (context) => 	{
	const { config: { auth: { providers }}} = context;

	return map(providers, (...props) => setupAuthFlow({ props, ...context }));
};

export default setupAuthFlows;
