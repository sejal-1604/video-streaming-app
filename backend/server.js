const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const testRoutes = require('./routes/testRoutes')
const roleTestRoutes = require('./routes/roleTestRoutes')
const videoRoutes = require('./routes/videoRoutes')
const streamRoutes = require('./routes/streamRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log('🔥 INCOMING REQUEST:', req.method, req.url)
  next()
})


app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/role-test', roleTestRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/stream', streamRoutes)
console.log('Stream routes loaded')


// Health route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is running'
  })
})

const PORT = process.env.PORT || 5000

// Start server FIRST
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Make io available globally
app.set('io', io)


// Connect MongoDB separately
console.log('MONGO_URI:', process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message))

  