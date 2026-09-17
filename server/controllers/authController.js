import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import User from '../models/User.js';

const memoryUsers = [];

// Pre-seed a demo account in memory (fallback when DB is offline)
(async () => {
  const demoHash = await bcrypt.hash('demo1234', 10);
  memoryUsers.push({
    _id: 'demo-user-001',
    name: 'Demo User',
    email: 'demo@nexora.ai',
    passwordHash: demoHash,
    isAdmin: false,
  });
})();

// Called after MongoDB connects to ensure demo account exists in DB
export const seedDemoUser = async () => {
  try {
    const exists = await User.findOne({ email: 'demo@nexora.ai' });
    if (!exists) {
      const passwordHash = await bcrypt.hash('demo1234', 10);
      await User.create({
        name: 'Demo User',
        email: 'demo@nexora.ai',
        passwordHash,
        isAdmin: false,
      });
      console.log('Demo user seeded into MongoDB.');
    }
  } catch (err) {
    console.error('Failed to seed demo user:', err.message);
  }
};

const buildToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'nexora-dev-secret-change-me',
    { expiresIn: '7d' }
  );

const findUserByEmail = async (email) => {
  if (mongoose.connection.readyState === 1) {
    return User.findOne({ email });
  }

  return memoryUsers.find((user) => user.email === email) || null;
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.create({
        name: String(name).trim(),
        email: normalizedEmail,
        passwordHash,
        isAdmin: false,
      });
    } else {
      user = {
        _id: randomUUID(),
        name: String(name).trim(),
        email: normalizedEmail,
        passwordHash,
        isAdmin: false,
      };
      memoryUsers.push(user);
    }

    const token = buildToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Signup failed.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = buildToken(user);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed.' });
  }
};
