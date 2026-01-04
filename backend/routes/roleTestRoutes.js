const express = require('express')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

// Only ADMIN can access
router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin 👑' })
})

// EDITOR + ADMIN can access
router.get('/editor', protect, authorize('editor', 'admin'), (req, res) => {
  res.json({ message: 'Welcome Editor ✍️' })
})

// Any logged-in user
router.get('/viewer', protect, (req, res) => {
  res.json({ message: 'Welcome Viewer 👀' })
})

module.exports = router
