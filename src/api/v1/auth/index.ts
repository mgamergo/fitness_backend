import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbClient from '../../../db/index';

const router: Router = Router();

// Define interfaces for request bodies
interface SignupRequestBody {
  name: string;
  username: string;
  password: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

// Signup endpoint
router.post('/signup', async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    res.status(400).json({ message: 'Name, username, and password are required' });
    return
  }

  try {
    // Check if user already exists
    const existingUser = await dbClient.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await dbClient.users.create({
      data: {
        name,
        username,
        hashedPassword,
      },
    });
    

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.userId }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Add an expiration time for the token
    });

    res.cookie('jwt', token, {httpOnly: true});
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return
  }

  try {
    // Find the user by username
    const user = await dbClient.users.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Add an expiration time for the token
    });

    res.cookie('jwt', token, {httpOnly: true});
    res.status(200).json({ message: 'Login successful'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('jwt', { httpOnly: true });
  res.status(200).json({ message: 'Logout successful' });
});

export default router;