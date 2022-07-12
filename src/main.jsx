import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import '@style/index.scss'
import { GoogleOAuthProvider } from '@moeindana/google-oauth'
import AuthProvider from './context/auth'
import * as Toast from '@radix-ui/react-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toast.Provider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Toast.Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
