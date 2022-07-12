import { useRef, useState, useEffect, useMemo } from 'react'
import { Container } from '@component/layout/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { styled } from '@stitches/react'
import { mauve } from '@radix-ui/colors'
import * as SelectPrimitive from '@radix-ui/react-select'
import { useNavigate } from 'react-router-dom'

import { Select } from '@component/styled/Select/Select'
import { Item } from '@component/styled/Select/Item'
import { Toasted } from '@component/styled/Toast/Toast'

import youtubeApi from '../api/youtube'

const StyledLabel = styled(SelectPrimitive.Label, {
  width: '100%',
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11
})

const SelectLabel = StyledLabel

export default () => {
  const navigate = useNavigate()
  const [file, setFile] = useState('')
  const filePreview = useMemo(() => file && URL.createObjectURL(file), [file])
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [categoryId, setCategoryId] = useState(1)
  const [alert, setAlert] = useState({ active: false })
  const ref = useRef()

  const fetchCategories = async () => {
    try {
      const response = await youtubeApi.get('/videoCategories', {
        params: {
          part: ['snippet'],
          regionCode: 'BR'
        }
      })
      setCategories(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (file != '' && categories.length > 0) return

    fetchCategories()
  }, [])

  const handleSubmit = async () => {
    if (file === '' || !categoryId) return
    try {
      const upload = await uploadVideo()
      setAlert({
        active: true,
        title: 'Upload realizado com sucesso!',
        description: 'salvo!',
        variant: 'success'
      })
      navigate(`/video/${id}`)
    } catch (error) {
      console.log('submit error', error)
      setAlert({
        active: true,
        title: 'Ocorreu um erro!',
        description: 'tente novamente!',
        variant: 'failure'
      })
    }
  }

  const uploadVideo = async () => {
    const videoTitle = title || 'unknown'
    const videoDescription = description || 'unknown'
    try {
      const formData = new FormData()
      formData.append('file', file)
      return await youtubeApi.post(
        '/videos',
        {
          params: { part: ['snippet', 'status'], alt: 'json', uploadType: 'multipart' },
          file: formData
        },
        {
          snippet: {
            title: videoTitle,
            description: videoDescription,
            categoryId: categoryId
          },
          status: {
            privacyStatus: 'unlisted'
          }
        }
      )
    } catch (error) {
      console.log('Upload Error', error)
    }
  }

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

      <div className="upload">
        <div className="main">
          <Container>
            <h1>Enviar vídeos</h1>
            <div className="uploader">
              {file === '' && (
                <>
                  <div onClick={() => ref.current.click()} className="filePicker">
                    <FontAwesomeIcon icon={faUpload} />
                    <input
                      onChange={({ target: { files } }) => {
                        setFile(files[0])
                      }}
                      style={{ display: 'none' }}
                      ref={ref}
                      type="file"
                      name="file"
                    />
                  </div>
                  <p>Selecione o arquivo de video para fazer upload</p>
                </>
              )}

              {filePreview && (
                <div>
                  <video src={filePreview} controls />
                </div>
              )}

              {file && (
                <>
                  <div className="form">
                    <p>Detalhes</p>
                    <div className="form-control">
                      <div className="text-field">
                        <label htmlFor="title">Título</label>
                        <input type="text" required name="title" onInput={(value) => setTitle(value)} />
                      </div>
                      <div className="text-field">
                        <label htmlFor="description">Descrição</label>
                        <input type="text" required name="description" onInput={(value) => setDescription(value)} />
                      </div>

                      {categories.length > 0 && (
                        <div className="text-field">
                          <label>Categorias</label>
                          <Select defaultValue="1" onValueChange={(value) => setCategoryId(value)}>
                            <SelectPrimitive.SelectGroup>
                              <SelectLabel>Categorias</SelectLabel>
                              {categories.map((category) => {
                                return <Item key={category.id} value={category.id} title={category.snippet.title} />
                              })}
                            </SelectPrimitive.SelectGroup>
                          </Select>
                        </div>
                      )}

                      <div className="actions">
                        <button onClick={handleSubmit}>Enviar</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}
