import { merge } from '@laufire/utils/collection';
import enrichReq from './enrichReq';
import normalizeProviders from '../normalizeProviders';
import getUserSchema from '../getUserSchema';

const enrichContext = (context) => {
	const enrichedContext = merge(context, { config: { auth: {
		providers: normalizeProviders(context),
		userSchema: getUserSchema(context),
	}}});
	const { app } = enrichedContext;

	app.use(enrichReq(enrichedContext));
	return enrichedContext;
};

export default enrichContext;
