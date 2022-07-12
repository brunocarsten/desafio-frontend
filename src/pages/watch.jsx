import { Container } from '@component/layout/Container'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import youtubeApi from '../api/youtube'
import { Video } from '@component/Video'

export default () => {
  let { id } = useParams()
  const [title, setTitle] = useState('')
  const [related, setRelated] = useState([])

  const getVideo = useCallback(async () => {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: id
      }
    })
    setTitle(response.data.items[0].snippet.title)
  }, [])

  const getRelatedList = useCallback(async () => {
    const response = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        type: 'video',
        relatedToVideoId: id,
        maxResults: 10
      }
    })
    setRelated(response.data.items)
  }, [])

  useEffect(() => {
    getVideo()
    getRelatedList()
  }, [])

  return (
    <>
      <div className="video">
        <div className="main">
          <Container>
            <div className="video-content">
              <div className="video-player">
                <iframe title={id} className="video-iframe" src={`https://www.youtube.com/embed/${id}`} />
                <p className="title">{title}</p>
              </div>
              <div className="related">
                <h1>Vídeos relacionados</h1>
                {related.map((item) => {
                  return <Video key={item.id.videoId} item={item} />
                })}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}
