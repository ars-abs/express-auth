import saveTokens from './saveTokens';
import jwt from 'jsonwebtoken';

const saveLogin = async ({ user: { idToken, ...restTokens }}, res) => {
	const { sub, iss } = jwt.decode(idToken);
	const token = jwt.sign(
		{ sub: sub, iss: iss, role: 'user' }, 'secret', { expiresIn: '1h' }
	);

	await saveTokens({ ...restTokens, sub, iss });

	res.cookie(
		'token', token, { httpOnly: true, secure: true }
	);
	res.redirect('/');
};

export default saveLogin;
