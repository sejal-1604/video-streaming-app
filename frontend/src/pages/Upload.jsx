import { useState } from 'react'
import api from '../api/axios'

const Upload = () => {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      setMessage('Please select a video')
      return
    }

    const formData = new FormData()
    formData.append('video', file)

    try {
      const res = await api.post('/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setMessage('Upload successful')
      console.log(res.data)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed')
    }
  }

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Upload
