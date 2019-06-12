import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ currentTab, order, children }) => {
  return (
    <div className={`tabs__slide ${currentTab === order ? 'tabs__slide--active' : ''}`}>
      {children}
    </div>
  );
};

Tab.propTypes = {
  currentTab: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
};

export default Tab;
