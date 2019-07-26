import React from "react";
import MarkDown from "markdown-to-jsx";
import Tabs from "../../components/Tabs";
import Tab from "../../components/Tabs/Tab";

const TabDemo = () => {
  const md = `
    <Tabs
      className="mb-40"
      tabList={[{ title: "Tab 0" }, { title: "Tab 1" }, { title: "Tab 2" }]}
      defaultTab={1}
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
  `;
  return (
    <>
      <h2 className="fz-24 mb-40 font-weight-bold">Tabs</h2>
      <Tabs
        className="mb-40"
        tabList={[{ title: "Tab 0" }, { title: "Tab 1" }, { title: "Tab 2" }]}
        defaultTab={1}
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
      <MarkDown
        className="code-block mt-20"
        children={md}
        options={{
          overrides: {
            Tabs: {
              component: Tabs
            }
          }
        }}
      />
      <ul className="prop-list mt-20 mb-40">
        <li>
          <strong>tabList</strong>{" "}
          <span className="code">array of objects, not required</span>: each tab
          should have its corresponding object here with the property{" "}
          <span className="code">title</span>, which will be the text that the
          tab button will show.
        </li>
        <li>
          <strong>defaultTab</strong>{" "}
          <span className="code">number, not required</span>: tab that's
          initially selected. Its value must correspond with the order of one of
          the elements in <span className="code">tabList</span>.
        </li>
        <li>
          <strong>order</strong>{" "}
          <span className="code">number, not required</span>: each{" "}
          <span className="code">Tab</span> element should include an order
          prop, which will determine its position in the array.
        </li>
        <li>
          <strong>className</strong>{" "}
          <span className="code">string, not required</span>: class which the
          element will receive.
        </li>
      </ul>
    </>
  );
};

export default TabDemo;
