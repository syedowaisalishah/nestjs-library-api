// src/common/middleware/decode-token.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.decode(token) as {
          id: number;
          email: string;
          iat: number;
          exp: number;
        };

        // Optional: log it as JSON
        console.log('🔓 Decoded JWT in Middleware:');
        console.log(JSON.stringify({
          id: decoded.id,
          email: decoded.email,
          issuedAt: new Date(decoded.iat * 1000).toISOString(),
          expiresAt: new Date(decoded.exp * 1000).toISOString(),
        }, null, 2));

        // Attach to request for controllers to use if needed
        (req as any).user = decoded;
      } catch (err) {
        console.warn('⚠️ Failed to decode token:', err.message);
      }
    }

    next();
  }
}
