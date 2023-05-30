import { merge } from '@laufire/utils/collection';
import normalizeProviders from './normalizeProviders';
import normalizeRepo from './normalizeRepo';

const normalizeContext = (context) => merge(context, { config: { auth: {
	repo: normalizeRepo(context),
	providers: normalizeProviders(context),
}}});

export default normalizeContext;
