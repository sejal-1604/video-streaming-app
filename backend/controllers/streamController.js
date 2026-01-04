const fs = require('fs')
const path = require('path')
const Video = require('../models/Video')

exports.streamVideo = async (req, res) => {
    console.log('STREAM HIT', req.headers.authorization, req.headers.range)

  try {
    const videoId = req.params.id
    const video = await Video.findById(videoId)

    if (!video) {
      return res.status(404).json({ message: 'Video not found' })
    }

    const videoPath = path.join(__dirname, '..', 'uploads', video.filename)
    const videoSize = fs.statSync(videoPath).size
    const range = req.headers.range

    if (!range) {
      return res.status(400).send('Requires Range header')
    }

    const CHUNK_SIZE = 10 ** 6 // 1MB
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const contentLength = end - start + 1

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': video.mimeType
    }

    res.writeHead(206, headers)

    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
