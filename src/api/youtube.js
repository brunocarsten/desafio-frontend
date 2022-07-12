import axios from 'axios'

const http = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    regionCode: 'BR',
    key: import.meta.env.VITE_GOOGLE_API_KEY
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(function (request) {
  const access_token = localStorage.getItem('token')
  if (access_token) {
    request.headers.Authorization = `Bearer ${access_token}`
  }
  return request
})

export default http
