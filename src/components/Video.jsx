import { useEffect, useCallback, memo, useState, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import youtubeApi from '../api/youtube'

export const Video = memo(({ item }) => {
  const navigate = useNavigate()
  const [video, setVideo] = useState([])
  const [thumbnail, setThumbnail] = useState('')
  const [title, setTitle] = useState('')

  const getVideo = useCallback(async () => {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: item.id.videoId || item.id
      }
    })
    if (response.data.items[0] !== undefined) setVideo(response.data.items[0])
  }, [])

  const handleMedaData = () => {
    setThumbnail(video.snippet.thumbnails.medium)
    setTitle(video.snippet.localized.title)
  }

  useEffect(() => {
    if (video != '') handleMedaData()
  }, [video])

  useEffect(() => {
    getVideo()
  }, [])

  const handleClick = () => {
    navigate(`/video/${video.id}`)
  }

  return (
    <>
      <Suspense fallback={<p>carregando...</p>}>
        <div onClick={() => handleClick()} className="card-video">
          <img src={thumbnail.url} alt="" />
          <p>{title}</p>
        </div>
      </Suspense>
    </>
  )
})
