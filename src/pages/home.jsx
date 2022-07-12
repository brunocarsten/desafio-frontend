import { useEffect, useState, useCallback, useContext } from 'react'
import { Container } from '@component/layout/Container'
import { Video } from '@component/Video'
import youtubeApi from '../api/youtube'
import { AuthContext } from '../context/auth'
import { ListContext } from '../context/list'
import { Toasted } from '@component/styled/Toast/Toast'

export default () => {
  const { signed, user, handleSignOut } = useContext(AuthContext)
  const { list, handleList } = useContext(ListContext)
  const [alert, setAlert] = useState({ active: false })

  const [error, setError] = useState(false)

  const getList = useCallback(async () => {
    if (list != '') return
    try {
      const response = await youtubeApi.get('/videos', {
        params: {
          part: ['snippet,contentDetails,statistics'],
          chart: 'mostPopular'
        }
      })
      handleList(response.data.items)
    } catch (error) {
      if (error.response.status === 403)
        setAlert({
          active: true,
          title: 'Ocorreu um erro!',
          description: 'Limite de requisições atingida',
          variant: 'failure'
        })
      setError(true)
      handleSignOut()
    }
  }, [])

  const getSubscriptions = useCallback(async () => {
    try {
      const response = await youtubeApi.get('/videos', {
        params: {
          part: 'snippet',
          myRating: 'like'
        }
      })

      const id = response.data.items[0].id
      const related = await youtubeApi.get('/search', {
        params: {
          part: 'snippet',
          type: 'video',
          relatedToVideoId: id
        }
      })
      handleList(related.data.items)
    } catch (error) {
      if (error.response.status === 403)
        setAlert({
          active: true,
          title: 'Ocorreu um erro!',
          description: 'Limite de requisições atingida',
          variant: 'failure'
        })
    }
  }, [])

  useEffect(() => {
    if (signed) {
      getSubscriptions()
      return
    }

    getList()
  }, [signed])

  return (
    <>
      {alert && (
        <Toasted
          variant={alert.variant}
          description={alert.description}
          title={alert.title}
          open={alert.active}
          onOpenChange={setAlert}
        />
      )}

      <div className="home">
        <div className="main">
          <Container>
            {signed && user !== undefined && <h1>Conteúdo inicial para {user.given_name} </h1>}

            {list.length > 0 && (
              <div className="list">
                {list.map((item, i) => {
                  return <Video key={i} item={item} />
                })}
              </div>
            )}

            {error && (
              <>
                <p>Ocorreu um erro ao solicitar recurso...</p>
              </>
            )}
          </Container>
        </div>
      </div>
    </>
  )
}
