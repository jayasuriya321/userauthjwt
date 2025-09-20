// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // Grab token from Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // If no token, block request
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    // Verify token with your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to req, without password
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }

    req.user = user; // 👈 makes the user available in controllers
    next();
  } catch (err) {
    console.error('Token error:', err);
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
  }
};

export default protect;
