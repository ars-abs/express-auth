import User from './User';

const saveTokens = async ({ sub, issuer, refreshToken, accessToken }) => {
	await User.findOrCreate({
		where: { user: sub },
		defaults: {
			user: sub,
			iss: issuer,
			refreshToken: refreshToken,
			accessToken: accessToken,
		},
	});
};

export default saveTokens;
