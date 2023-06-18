import { merge } from '@laufire/utils/collection';
import enrichReq from './enrichReq';
import normalizeProviders from './normalizeProviders';
import buildUserSchema from './buildUserSchema';

const enrichContext = (context) => {
	const enrichedContext = merge(context, { config: { auth: {
		providers: normalizeProviders(context),
		userSchema: buildUserSchema(context),
	}}});
	const { app } = enrichedContext;

	app.use(enrichReq(enrichedContext));

	return enrichedContext;
};

export default enrichContext;
