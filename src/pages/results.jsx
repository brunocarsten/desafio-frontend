import { useContext } from 'react'
import { Container } from '@component/layout/Container'
import { Video } from '@component/Video'
import { ListContext } from '../context/list'

export default () => {
  const { list } = useContext(ListContext)

  {
    if (list != '') {
      return (
        <>
          <Container>
            <div className="main">
              <h1>Resultado da pesquisa </h1>
              <div className="result-list">
                {list.map((item) => {
                  return <Video key={item.id} item={item} />
                })}
              </div>
            </div>
          </Container>
        </>
      )
    }
  }

  return (
    <>
      <Container>
        <div className="main">
          <h1>Nenhum vídeo encontrado...</h1>
        </div>
      </Container>
    </>
  )
}
