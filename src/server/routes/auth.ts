import { Router } from 'express';
import type { Request, Response } from 'express';
import { transaction } from '../db';
import { createUser, findUserByEmail, updateLastLogin } from '../db/queries/users';
import { createPendingSubscription } from '../db/queries/subscriptions';
import { AuthService } from '../services/auth';
import { ErrorCodes } from '../../shared/errorCodes';
import { missingLoginFields, missingSignupFields, validateEmail, validatePassword } from '../utils';

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

router.post('/signup', async (req: Request, res: Response) => {
  const {
    email: rawEmail,
    password: rawPassword,
    name: rawName,
  } = req.body as { email?: string; password?: string; name?: string };

  if (missingSignupFields(rawEmail, rawPassword, rawName)) {
    return res
      .status(400)
      .json({
        error: 'Email, password and name are required',
        errorCode: ErrorCodes.Auth.MISSING_FIELDS,
      });
  }

  const email = rawEmail as string;
  const password = rawPassword as string;
  const name = rawName as string;

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ error: 'Invalid email format', errorCode: ErrorCodes.Auth.INVALID_EMAIL_FORMAT });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters',
      errorCode: ErrorCodes.Auth.PASSWORD_TOO_SHORT,
    });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Email already exists', errorCode: ErrorCodes.Auth.EMAIL_ALREADY_EXISTS });
    }

    const passwordHash = await AuthService.hashPassword(password);

    const user = await transaction(async (client) => {
      const subscription = await createPendingSubscription(client);
      return createUser({ email, passwordHash, name, subscriptionId: subscription.id }, client);
    });

    const token = AuthService.generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        authProvider: user.authProvider,
        subscriptionId: user.subscriptionId,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
