import axios from 'axios';
import querystring from 'querystring';

const fetchTokens = async ({
	refreshToken, tokenURL, clientID, clientSecret,
}) => {
	const requestBody = querystring.stringify({
		grant_type: 'refresh_token',
		client_id: clientID,
		client_secret: clientSecret,
		refresh_token: refreshToken,
		scope: 'openid profile',
	});
	/* eslint-disable id-match, camelcase */
	const { data: { access_token, refresh_token, id_token }} = await axios.post(
		tokenURL, requestBody,
		{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
	);

	return {
		accessToken: access_token,
		idToken: id_token,
		refreshToken: refresh_token || refreshToken,
	};
	/* eslint-enable id-match, camelcase */
};

export default fetchTokens;
