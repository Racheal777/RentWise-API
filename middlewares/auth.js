import jwt from "jsonwebtoken"
import { secret } from "../config/env.js";
import { checkPermission } from '../utils/permission.js'

export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};


export const authorize = (required) => {
  return (req, res, next) => {
    const role = req.user.role;
    const requiredList = Array.isArray(required) ? required : [required];

    // Check if role is allowed directly
    if (requiredList.includes(role)) {
      return next();
    }

    // Check if any of the permissions are allowed
    const isAllowed = requiredList.every(action => checkPermission(role, action));

    if (!isAllowed) {
      return res.status(403).json({ message: `Access denied for role ${role}` });
    }

    next();
  };
};

export const secureRoute = (action, controller) => {
  return [authenticate, authorize(action), controller];
};