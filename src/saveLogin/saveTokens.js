
const saveTokens = async ({
	config: { auth: { userSchema }},
	data: { sub, issuer, refreshToken, accessToken },
}) => {
	await userSchema.findOrCreate({
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
