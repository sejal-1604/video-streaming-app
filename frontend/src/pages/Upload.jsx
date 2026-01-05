import { useState } from 'react'
import api from '../api/axios'

const Upload = () => {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setMessage('Please select a video file')
      return
    }

    const formData = new FormData()
    formData.append('video', file)

    setIsLoading(true)
    setMessage('')
    setProgress(0)

    try {
      await api.post('/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percent)
        }
      })
      setMessage('Upload successful! Processing started.')
      setFile(null)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800">Upload Video</h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-indigo-400 transition-colors group text-center">
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <svg className="mx-auto h-12 w-12 text-gray-300 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm font-semibold text-gray-700">{file ? file.name : 'Click to select video'}</p>
          </div>

          {isLoading && (
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading || !file}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            {isLoading ? `Uploading ${progress}%` : 'Upload Now'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.includes('success') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload