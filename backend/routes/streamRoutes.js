const express = require('express')
const { streamVideo } = require('../controllers/streamController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// Stream video by ID
router.get('/:id', protect, streamVideo)

module.exports = router
