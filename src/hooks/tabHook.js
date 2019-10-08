import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const TabContext = React.createContext({})

const useTabHook = ({ defaultTab }) => {
  const [currentTab, setCurrentTab] = useState(defaultTab)

  const handleTabChange = value => setCurrentTab(value)

  return { currentTab, handleTabChange }
}

useTabHook.PropTypes = {
  default: PropTypes.string,
}

useTabHook.defaultProps = {
  defaultTab: 0,
}

export default useTabHook
