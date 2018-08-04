import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import compose from 'composable-middleware';


const validateJwt: expressJwt.RequestHandler = expressJwt({
    secret: 'signal', 
});

export function isAuthenticated() {
    
    return compose()
        .use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        .use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
            // DB에서 데이터를 찾아서 req에 추가한다.
        })
}

// config 속성으로 빼서 고칠것
export function signToken(id: string, name: string) {
    
    return jwt.sign({
        _id: id, 
        name: name,
    }, 'signal', { expiresIn: '2day'});
}

