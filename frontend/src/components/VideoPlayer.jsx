import { useEffect, useState } from 'react'

const VideoPlayer = ({ video }) => {
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
    if (!video) return

    const fetchVideo = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetch(
          `http://localhost:5000/api/stream/${video._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Range: 'bytes=0-'
            }
          }
        )

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setVideoUrl(url)
      } catch (err) {
        console.error('Video fetch error:', err)
      }
    }

    fetchVideo()

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [video])

  if (!video) return <p>Select a video</p>

  return (
    <div>
      <h3>{video.originalName}</h3>
      {videoUrl ? (
        <video controls width="600" src={videoUrl} />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  )
}

export default VideoPlayer
