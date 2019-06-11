import React, { useState } from 'react';
import './tabs.scss';

const Tabs = ({ defaultTab, tabList, children }) => {
  const [currentTab, setCurrentTab] = useState(defaultTab ? defaultTab : 0);

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

export default Tabs;
