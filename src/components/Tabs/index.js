import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './tabs.scss';

const Tabs = ({ defaultTab, tabList, children }) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const displacement = 100 / tabList.length;

  const lineStyle = {
    width: 100 / tabList.length + '%',
    left: `${currentTab * displacement}%`,
  };

  const slideContainerStyle = {
    width: 100 * tabList.length + '%',
    transform: `translateX(${-((100 / tabList.length) * currentTab)}%)`,
  };

  return (
    <div className='tabs'>
      <div className='tabs__button-wrapper'>
        {tabList.map((tabButton, index) => (
          <button
            key={index}
            onClick={() => setCurrentTab(index)}
            className={`tabs__button ${currentTab === index && 'tabs__button--active'}`}>
            {tabButton.title}
          </button>
        ))}
        <div className='tabs__line' style={lineStyle} />
      </div>
      <div className='tabs__slide-wrapper'>
        <div className='tabs__slide-container' style={slideContainerStyle}>
          {children(currentTab)}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  defaultTab: PropTypes.number,
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
};

Tabs.defaultProps = {
  defaultTab: 0,
};

export default Tabs;
