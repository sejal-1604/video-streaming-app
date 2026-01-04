const express = require('express')
const upload = require('../utils/multer')
const { uploadVideo, getVideos } = require('../controllers/videoController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

// ✅ GET all videos
router.get('/', protect, getVideos)

// ✅ Upload video (editor/admin only)
router.post(
  '/upload',
  protect,
  authorize('editor', 'admin'),
  upload.single('video'),
  uploadVideo
)

module.exports = router
