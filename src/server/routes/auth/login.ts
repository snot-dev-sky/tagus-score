import { Router } from 'express';
import type { Request, Response } from 'express';
import { findUserByEmail, updateLastLogin } from '../../db/queries/users';
import { AuthService } from '../../services/auth';
import { ErrorCodes } from '../../constants/errorCodes';
import { missingLoginFields, validateEmail } from '../../utils';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email: rawEmail, password: rawPassword } = req.body as {
    email?: string;
    password?: string;
  };

  if (missingLoginFields(rawEmail, rawPassword)) {
    return res
      .status(400)
      .json({
        error: 'Email and password are required',
        errorCode: ErrorCodes.Auth.MISSING_FIELDS,
      });
  }

  const email = rawEmail as string;
  const password = rawPassword as string;

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ error: 'Invalid email format', errorCode: ErrorCodes.Auth.INVALID_EMAIL_FORMAT });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials', errorCode: ErrorCodes.Auth.INVALID_CREDENTIALS });
    }

    if (user.authProvider !== 'email' || !user.passwordHash) {
      return res
        .status(401)
        .json({ error: 'Use Google to login', errorCode: ErrorCodes.Auth.USE_GOOGLE_LOGIN });
    }

    const validPassword = await AuthService.validatePassword(password, user.passwordHash);
    if (!validPassword) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials', errorCode: ErrorCodes.Auth.INVALID_CREDENTIALS });
    }

    await updateLastLogin(user.id);

    const token = AuthService.generateToken(user);

    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
