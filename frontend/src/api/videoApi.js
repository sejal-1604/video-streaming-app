import api from './axios'

export const fetchVideos = async () => {
  const res = await api.get('/videos')
  return res.data
}
