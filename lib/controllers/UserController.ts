import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
;
import { User } from '../models/User';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({id: user.id, email : user.email, name : user.name}, 'signal', {
            expiresIn : '2day'
        });
        res.status(201).json({
            token,
        });
    } catch(e) {
        next(e);
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;
        const user: User | null = await User.findOne({
            where: {
                email,
            }
        });
        if ( ( user != null ) && ( user.authenticate(password) ) ) {
            const token = jwt.sign({id: user.id, email : user.email, name : user.name}, 'signal', {
                expiresIn : '2day'
            });
            res.json({
                token,
            })
        }
    } catch(e) {
        next(e);
    }
}