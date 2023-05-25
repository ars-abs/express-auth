import saveTokens from './saveTokens';

const saveLogin = async ({ user }, res) => {
	const { idToken } = user;

	await saveTokens(user);
	res.cookie(
		'token', idToken, { httpOnly: true, secure: true }
	);
	res.redirect('/');
};

export default saveLogin;
