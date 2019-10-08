import React from 'react'
import PropTypes from 'prop-types'
import './tabs.scss'
import useTabHook, { TabContext } from '../../hooks/tabHook'

const Tabs = ({ tabList, children, className, defaultTab }) => {
  const { currentTab, handleTabChange } = useTabHook({ defaultTab })

  const displacement = 100 / tabList.length

  const lineStyle = {
    width: 100 / tabList.length + '%',
    left: `${currentTab * displacement}%`,
  }

  const slideContainerStyle = {
    width: 100 * tabList.length + '%',
    transform: `translateX(${-((100 / tabList.length) * currentTab)}%)`,
  }

  return (
    <TabContext.Provider value={currentTab}>
      <div className={`tabs ${className || ''}`}>
        <div className='tabs__button-wrapper'>
          {tabList.map((tabButton, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`tabs__button ${currentTab === index && 'tabs__button--active'}`}>
              {tabButton.title}
            </button>
          ))}
          <div className='tabs__line' style={lineStyle} />
        </div>
        <div className='tabs__slide-wrapper'>
          <div className='tabs__slide-container' style={slideContainerStyle}>
            {children}
          </div>
        </div>
      </div>
    </TabContext.Provider>
  )
}

Tabs.propTypes = {
  defaultTab: PropTypes.number,
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
}

Tabs.defaultProps = {
  className: '',
  defaultTab: 0,
}

export default Tabs
