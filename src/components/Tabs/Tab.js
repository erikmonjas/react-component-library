import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TabContext } from '../../hooks/tabHook'

const Tab = ({ order, children, className }) => {
  const { currentTab } = useContext(TabContext)

  return (
    <div
      className={`tabs__slide ${
        currentTab === order ? 'tabs__slide--active' : ''
      } ${className || ''}`}
    >
      {children}
    </div>
  )
}

Tab.propTypes = {
  order: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
}

Tab.defaultProps = {
  className: '',
}

export default Tab
