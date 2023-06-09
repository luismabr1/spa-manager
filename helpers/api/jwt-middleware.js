import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/clients/register',
            '/api/citas/register',
            '/api/users/authenticate',
            '/api/clients/authenticate',
            '/api/citas/authenticate'
        ]
    });

    return util.promisify(middleware)(req, res);
}