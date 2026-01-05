import { useEffect, useState } from 'react'

const VideoPlayer = ({ video }) => {
  const [videoUrl, setVideoUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!video) return
    const fetchVideo = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:5000/api/stream/${video._id}`, {
          headers: { Authorization: `Bearer ${token}`, Range: 'bytes=0-' }
        })
        const blob = await res.blob()
        setVideoUrl(URL.createObjectURL(blob))
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideo()
    return () => videoUrl && URL.revokeObjectURL(videoUrl)
  }, [video])

  // Empty State: No video selected
  if (!video) return (
    <div className="bg-brand-card rounded-2xl shadow-soft border border-slate-100 h-full min-h-[450px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="w-20 h-20 bg-brand-primary/5 rounded-3xl flex items-center justify-center mb-6 ring-8 ring-brand-primary/5">
        <svg className="h-10 w-10 text-brand-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-slate-900 font-bold text-xl">Ready to stream?</h3>
      <p className="text-slate-500 text-sm mt-2 max-w-[240px]">
        Select a video from your library to start the analysis playback.
      </p>
    </div>
  )

  // Video Player View
  return (
    <div className="bg-brand-card rounded-2xl shadow-soft border border-slate-100 overflow-hidden animate-fade-in">
      <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <h3 className="font-bold text-slate-800 truncate max-w-md">{video.originalName}</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
          Live Stream
        </span>
      </div>

      <div className="aspect-video bg-slate-950 flex items-center justify-center relative group">
        {isLoading ? (
          <div className="flex flex-col items-center text-white/70">
            <div className="h-12 w-12 border-[3px] border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-medium tracking-widest uppercase">Fetching stream...</p>
          </div>
        ) : videoUrl ? (
          <video 
            controls 
            autoPlay 
            className="w-full h-full object-contain" 
            src={videoUrl} 
          />
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-slate-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-slate-400 text-sm font-medium">Stream connection lost</p>
          </div>
        )}
      </div>
      
      {/* Subtle footer info */}
      <div className="px-6 py-3 bg-white flex items-center text-[11px] text-slate-400">
        <span className="mr-4">**Format**: MP4 / H.264</span>
        <span>**ID**: {video._id}</span>
      </div>
    </div>
  )
}

export default VideoPlayer