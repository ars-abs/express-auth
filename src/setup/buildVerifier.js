import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const cookieExtractor = (req) => (req && req.cookies ? req.cookies.token : '');

const buildVerifier = () => {
	passport.use('jwt', new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
		secretOrKey: process.env.JWTSECRET,
	}, (jwtPayload, done) => done(null, jwtPayload)));

	return passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false });
};

export default buildVerifier;
