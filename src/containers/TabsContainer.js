import React from "react";
import Tabs from "../components/Tabs";
import Tab from "../components/Tabs/Tab";

const TabsContainer = () => {
  return (
    <div className="tabs-demo">
      <h2 className="fz-24 mb-40 font-weight-bold">Tabs</h2>
      <Tabs
        className="mb-40"
        tabList={[{ title: "Tab 0" }, { title: "Tab 1" }, { title: "Tab 2" }]}
      >
        <Tab className="mt-20" order={0}>
          <p>I'm tab 0</p>
        </Tab>
        <Tab className="mt-20" order={1}>
          <p>I'm tab 1</p>
        </Tab>
        <Tab className="mt-20" order={2}>
          <p>I'm tab 2</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsContainer;
