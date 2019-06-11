import React from 'react';
import Tabs from './Tabs';
import Tab from './Tabs/Tab';

function App() {
  return (
    <Tabs tabList={[{ title: 'Tab 0' }, { title: 'Tab 1' }, { title: 'Tab 2' }]}>
      {currentTab => (
        <>
          <Tab currentTab={currentTab} order={0}>
            <p>I'm tab 0</p>
          </Tab>
          <Tab currentTab={currentTab} order={1}>
            <p>I'm tab 1</p>
          </Tab>
          <Tab currentTab={currentTab} order={2}>
            <p>I'm tab 2</p>
          </Tab>
        </>
      )}
    </Tabs>
  );
}

export default App;
