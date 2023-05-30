import { map } from '@laufire/utils/collection';

const normalizeProviders = ({ config: { auth: { strategies, providers }}}) =>
	map(providers, (provider, name) => ({ ...provider, ...strategies[name] }));

export default normalizeProviders;
