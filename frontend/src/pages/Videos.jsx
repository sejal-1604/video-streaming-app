import { useEffect, useState } from 'react'
import { fetchVideos } from '../api/videoApi'

const Videos = ({ onSelect }) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos().then(setVideos)
  }, [])

  return (
    <div>
      <h2>Uploaded Videos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {videos.map((v) => (
        <li key={v._id} style={{ marginBottom: '8px' }}>
        <button
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '10px',
          borderRadius: '6px',
          background: '#f1f5f9'
        }}
        onClick={() => onSelect(v)}
      >
        {v.originalName} — <b>{v.status}</b>
      </button>
    </li>
  ))}
</ul>

    </div>
  )
}

export default Videos
