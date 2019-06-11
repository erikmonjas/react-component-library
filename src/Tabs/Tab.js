import React from 'react';

const Tab = ({ currentTab, order, children }) => {
  return (
    <div className={`tabs__slide ${currentTab === order ? 'tabs__slide--active' : ''}`}>
      {children}
    </div>
  );
};

export default Tab;
