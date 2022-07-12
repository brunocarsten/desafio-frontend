import { useState, useContext, useEffect, useRef } from 'react'
import logo from '../assets/images/Youtube-logo-white-png.png'
import { useGoogleLogin } from '@moeindana/google-oauth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faClose, faUpload } from '@fortawesome/free-solid-svg-icons'
import { Suggestion } from '@component/Suggestion'

import youtubeApi from '../api/youtube'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { ListContext } from '../context/list'

export const Header = () => {
  const ref = useRef()
  const navigate = useNavigate()
  const { user, signed, handleSignIn, handleSignOut } = useContext(AuthContext)
  const { handleList } = useContext(ListContext)

  const [term, setTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const login = useGoogleLogin({
    onSuccess: (response) => handleSignIn(response),
    scope: ['https://www.googleapis.com/auth/youtube'],
    flow: 'auth-code'
  })

  const logout = () => {
    handleSignOut()
    navigate('/')
  }

  const handleInput = ({ target: { value } }) => {
    setTerm(value)
  }

  const handleFocus = () => {
    if (ref.current.classList.contains('active')) {
      return ref.current.classList.remove('active')
    }

    return ref.current.classList.add('active')
  }

  const handleSuggestions = (term) => {
    let items = JSON.parse(localStorage.getItem('suggestions'))
    if (items) {
      items = [...items, term]
      localStorage.setItem('suggestions', JSON.stringify(items))
    } else {
      localStorage.setItem('suggestions', JSON.stringify([term]))
    }
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('suggestions'))

    if (items) setSuggestions(items)
  }, [term])

  const search = async () => {
    if (term === '') return
    try {
      const response = await youtubeApi.get('/search', {
        params: { q: term, type: 'video' }
      })
      await handleList(response.data.items)
    } catch (error) {
      console.log(error)
    }
    const hasTerm = suggestions.some((suggestion) => {
      return term === suggestion
    })
    if (!hasTerm && term != '') handleSuggestions(term)
    navigate('/results')
  }

  return (
    <div className="header">
      <div className="content">
        <div className="logo">
          <img
            onClick={() => {
              navigate('/')
            }}
            src={logo}
            alt="logo"
          />
        </div>

        <div className="search">
          <input
            onFocus={() => {
              handleFocus()
            }}
            onBlur={() => {
              handleFocus()
            }}
            value={term}
            type="text"
            placeholder="Pesquisar..."
            onChange={handleInput}
          />

          <div ref={ref} className="suggestions">
            {suggestions.map((item, i) => {
              return (
                <Suggestion
                  onClick={() => {
                    setTerm(item)
                  }}
                  key={i}
                  item={item}
                />
              )
            })}
          </div>

          {term != '' && (
            <>
              <button
                className="reset"
                onClick={() => {
                  setTerm('')
                }}
                label="limpar"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </>
          )}
          <button className="find" onClick={() => search()} label="buscar">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="buttons">
          {signed && (
            <>
              <div className="upload">
                <button onClick={() => navigate('/upload')}>
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              </div>
              <div
                onClick={() => {
                  logout()
                }}
                className="logout"
              >
                {user !== undefined && (
                  <div className="avatar">
                    <img src={user.picture} alt="" />
                  </div>
                )}

                <span>Sair</span>
              </div>
            </>
          )}

          {!signed && (
            <div onClick={() => login()} className="login">
              <span>Login</span>
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
