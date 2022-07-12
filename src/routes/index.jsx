import { lazy, Suspense, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ListProvider } from '../context/list'
import { Header } from '@component/Header'
import { Loader } from '@component/Loader'
import { AuthContext } from '../context/auth'

const Home = lazy(() => import('@page/home'))
const Watch = lazy(() => import('@page/watch'))
const Results = lazy(() => import('@page/results'))
const Upload = lazy(() => import('@page/upload'))
import { Transition } from '@component/layout/Transition'

export const AppRoutes = () => {
  const { signed } = useContext(AuthContext)
  return (
    <>
      <BrowserRouter>
        <ListProvider>
          <Header />
          <Transition>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/results"
                element={
                  <Suspense fallback={<Loader />}>
                    <Results />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/video/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <Watch />
                  </Suspense>
                }
              />
              {signed && (
                <Route
                  exact
                  path="/upload"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Upload />
                    </Suspense>
                  }
                />
              )}
            </Routes>
          </Transition>
        </ListProvider>
      </BrowserRouter>
    </>
  )
}
