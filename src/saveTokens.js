import User from './User';

const saveTokens = async ({ sub, iss, refreshToken, accessToken }) => {
	await User.findOrCreate({
		where: { user: sub },
		defaults: {
			user: sub,
			iss: iss,
			refreshToken: refreshToken,
			accessToken: accessToken,
		},
	});
};

export default saveTokens;
