import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

const clearCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};

export class AuthController {
  static register = async (req: Request, res: Response) => {
    try {
      const { email, password, name, avatarUrl } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required',
          code: 'INVALID_REQUEST',
        });
      }

      const user = await AuthService.signup(email, password, name, avatarUrl);
      return res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      if (error.message === 'User already exists') {
        return res.status(409).json({
          success: false,
          message: 'Email already exists',
          code: 'EMAIL_ALREADY_EXISTS',
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message,
        code: 'INVALID_REQUEST',
      });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
          code: 'INVALID_REQUEST',
        });
      }

      const result = await AuthService.signin(email, password);
      setCookies(res, result.accessToken, result.refreshToken);

      return res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS',
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message,
        code: 'INVALID_REQUEST',
      });
    }
  };

  static refresh = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required',
          code: 'INVALID_REQUEST',
        });
      }

      const result = await AuthService.refresh(refreshToken);
      setCookies(res, result.accessToken, result.refreshToken);

      return res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
        code: 'INVALID_CREDENTIALS',
      });
    }
  };

  static logout = async (req: any, res: Response) => {
    try {
      if (req.user?.userId) {
        await AuthService.signout(req.user.userId);
      }
      clearCookies(res);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  };
}
