import { findIndex } from '@laufire/utils/collection';
import saveTokens from './saveTokens';
import jwt from 'jsonwebtoken';

const saveLogin = async ({ user: { idToken, ...restTokens },
	context: { config: { auth: { providers }}}}, res, next) => {
	const { sub, iss } = jwt.decode(idToken);

	const issuer = findIndex(providers,
		({ issuer: provider }) => provider === iss);
	const token = jwt.sign(
		{
			sub: sub,
			iss: issuer,
			role: 'user',
		}, process.env.JWTSECRET, { expiresIn: '1h' }
	);

	await saveTokens({ ...restTokens, sub, issuer });
	res.cookie(
		'token', token, { httpOnly: true, secure: true }
	);
	next();
};

export default saveLogin;
