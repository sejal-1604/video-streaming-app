// const jwt = require('jsonwebtoken')
// const User = require('../models/User')

// const protect = async (req, res, next) => {
//   try {
//     let token

//     // Check Authorization header
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1]
//     }

//     if (!token) {
//       return res.status(401).json({ message: 'Not authorized, no token' })
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     // Attach user to request (exclude password)
//     req.user = await User.findById(decoded.id).select('-password')

//     if (!req.user) {
//       return res.status(401).json({ message: 'User not found' })
//     }

//     next()
//   } catch (error) {
//     return res.status(401).json({ message: 'Not authorized, token failed' })
//   }
// }


// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: 'Access denied: insufficient permissions'
//       })
//     }
//     next()
//   }
// }
// module.exports = { protect, authorize }


const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    console.log('AUTH HEADER:', req.headers.authorization)

    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('DECODED TOKEN:', decoded)

    req.user = await User.findById(decoded.id).select('-password')
    console.log('USER FROM DB:', req.user)

    next()
  } catch (error) {
    console.error('JWT ERROR:', error.message)
    return res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    console.log('USER ROLE CHECK:', req.user.role)
    console.log('ALLOWED ROLES:', roles)

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied: insufficient permissions'
      })
    }
    next()
  }
}

module.exports = { protect, authorize }
