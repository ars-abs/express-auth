import passport from 'passport';

// TODO: Dynamic Import
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as AzureADStrategy } from 'passport-azure-ad-oauth2';

const Strategies = {
	google: GoogleStrategy,
	azure: AzureADStrategy,
};

const cb = (
	accessToken, refreshToken, params, profile, done
) => done(null, {
	accessToken: accessToken,
	refreshToken: refreshToken,
	idToken: params.id_token,
});

const setupProvider = ({ data: { provider, props }}) =>
	passport.use(`${ provider }`, new Strategies[provider]({ ...props }, cb));

export default setupProvider;
