const Video = require('../models/Video')

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' })
    }

    const video = await Video.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user._id,
      status: 'processing'
    })

    const io = req.app.get('io')

    // 🔁 Simulate background processing
    simulateProcessing(video._id, io)
    
    res.status(201).json({
      message: 'Video uploaded and processing started',
      video
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 })
    res.json(videos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const simulateProcessing = async (videoId, io) => {
  const steps = [
    { progress: 10, message: 'Processing started' },
    { progress: 40, message: 'Analyzing frames' },
    { progress: 70, message: 'Checking sensitivity' },
    { progress: 100, message: 'Processing complete' }
  ]

  for (const step of steps) {
    await new Promise((res) => setTimeout(res, 2000))

    io.emit('video-progress', {
      videoId,
      progress: step.progress,
      message: step.message
    })
  }

  const isSafe = Math.random() > 0.5

  await Video.findByIdAndUpdate(videoId, {
    status: isSafe ? 'safe' : 'flagged'
  })

  io.emit('video-complete', {
    videoId,
    status: isSafe ? 'safe' : 'flagged'
  })
}

