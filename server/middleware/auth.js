import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    req.user = { id: 'anonymous-user', email: 'guest@nexora.ai', name: 'Guest Founder' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nexora-dev-secret-change-me');
    req.user = decoded;
    return next();
  } catch (error) {
    req.user = { id: 'anonymous-user', email: 'guest@nexora.ai', name: 'Guest Founder' };
    return next();
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  return next();
};
