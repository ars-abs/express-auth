import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const cookieExtractor = (req) => (req && req.cookies ? req.cookies.token : '');

const setupVerifier = () => {
	passport.use('jwt', new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
		secretOrKey: 'secret',
	}, (jwtPayload, done) => done(null, jwtPayload)));
};

export default setupVerifier;
