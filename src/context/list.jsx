import { createContext, useState, useEffect, useCallback } from 'react'

export const ListContext = createContext()

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([])

  const handleList = (items) => {
    setList(items)
  }

  const value = {
    list,
    handleList
  }
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}
