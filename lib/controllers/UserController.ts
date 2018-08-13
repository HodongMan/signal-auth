import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
;
import { User } from '../models/User';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({id : user.id, name : user.name}, 'signal', {
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
        const {id, password} = req.body;
        const user: User | null = await User.findById(id);
        if ( ( user != null ) && ( user.authenticate(password) ) ) {
            const token = jwt.sign({id : user.id, name : user.name}, 'signal', {
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