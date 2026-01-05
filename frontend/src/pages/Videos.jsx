import { useEffect, useState } from 'react'
import { fetchVideos } from '../api/videoApi'

const Videos = ({ onSelect }) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos().then(setVideos)
  }, [])

  return (
    <div className="space-y-3">
      {videos.map((v) => (
        <button
          key={v._id}
          onClick={() => onSelect(v)}
          className="w-full group flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mr-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{v.originalName}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{v.status}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Videos