import defaultSettings from '../../config/defaultSettings';
import {PageContainer} from "@ant-design/pro-components";
import React from "react";

const {tabsLayout} = defaultSettings;

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/22
 *
 * */

const TabsLayout: React.FC<{ children: any }> = (props) => {
  console.log(props)
  const renderTabs = () => {
    if (tabsLayout)
      return <PageContainer ghost={true}/>
    else
      return <></>;
  }
  return (
    <div>
      {renderTabs()}
      <div>{props.children}</div>
    </div>
  );
};

export default TabsLayout;
