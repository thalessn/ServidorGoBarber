import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        // Foi cridao a interface TokenPayLoad para ser
        // possível utilizar a função " as " para "Converter" em outro objeto
        const { sub } = decoded as TokenPayload;

        // Para inserir a id do usuário no request do Express
        // foi criado um arquivo @types incluindo a propriedade user
        // e assim poder ser utilizado nas demais rotas que utilizam esse middleware
        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token', 401);
    }
}
