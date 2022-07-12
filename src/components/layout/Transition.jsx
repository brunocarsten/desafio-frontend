import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Transition = ({ children }) => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('fadeIn')

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut')
  }, [location, displayLocation])

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransistionStage('fadeIn')
          setDisplayLocation(location)
        }
      }}
    >
      {children}
    </div>
  )
}
