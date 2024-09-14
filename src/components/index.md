---
title: 业务组件
sidemenu: false
---

> 此功能由[dumi](https://d.umijs.org/zh-CN/guide/advanced#umi-%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%A8%A1%E5%BC%8F)
> 提供，dumi 是一个 📖 为组件开发场景而生的文档工具，用过的都说好。

# 业务组件

这里列举了 Pro 中所有用到的组件，这些组件不适合作为组件库，但是在业务中却真实需要。所以我们准备了这个文档，来指导大家是否需要使用这个组件。

## Footer 页脚组件

这个组件自带了一些 Pro 的配置，你一般都需要改掉它的信息。

```tsx
/**
 * background: '#f0f2f5'
 */
import React from 'react';
import Footer from '@/components/Footer';

export default () => <Footer/>;
```

## HeaderDropdown 头部下拉列表

HeaderDropdown 是 antd Dropdown 的封装，但是增加了移动端的特殊处理，用法也是相同的。

```tsx
/**
 * background: '#f0f2f5'
 */
import {Button, Menu} from 'antd';
import React from 'react';
import HeaderDropdown from '@/components/HeaderDropdown';

export default () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="center">个人中心</Menu.Item>
      <Menu.Item key="settings">个人设置</Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Button>hover 展示菜单</Button>
    </HeaderDropdown>
  );
};
```

## HeaderSearch 头部搜索框

一个带补全数据的输入框，支持收起和展开 Input

```tsx
/**
 * background: '#f0f2f5'
 */
import {Button, Menu} from 'antd';
import React from 'react';
import HeaderSearch from '@/components/HeaderSearch';

export default () => {
  return (
    <HeaderSearch
      placeholder="站内搜索"
      defaultValue="umi ui"
      options={[
        {label: 'Ant Design Pro', value: 'Ant Design Pro'},
        {
          label: 'Ant Design',
          value: 'Ant Design',
        },
        {
          label: 'Pro Table',
          value: 'Pro Table',
        },
        {
          label: 'Pro Layout',
          value: 'Pro Layout',
        },
      ]}
      onSearch={(value) => {
        console.log('input', value);
      }}
    />
  );
};
```

### API

| 参数              | 说明                | 类型                           | 默认值 |
|-----------------|-------------------|------------------------------|-----|
| value           | 输入框的值             | `string`                     | -   |
| onChange        | 值修改后触发            | `(value?: string) => void`   | -   |
| onSearch        | 查询后触发             | `(value?: string) => void`   | -   |
| options         | 选项菜单的的列表          | `{label,value}[]`            | -   |
| defaultVisible  | 输入框默认是否显示，只有第一次生效 | `boolean`                    | -   |
| visible         | 输入框是否显示           | `boolean`                    | -   |
| onVisibleChange | 输入框显示隐藏的回调函数      | `(visible: boolean) => void` | -   |

## NoticeIcon 通知工具

通知工具提供一个展示多种通知信息的界面。

```tsx
/**
 * background: '#f0f2f5'
 */
import {message} from 'antd';
import React from 'react';
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';

export default () => {
  const list = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification',
    },
  ];
  return (
    <NoticeIcon
      count={10}
      onItemClick={(item) => {
        message.info(`${item.title} 被点击了`);
      }}
      onClear={(title: string, key: string) => message.info('点击了清空更多')}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('点击了查看更多')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={2}
        list={list}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={2}
        list={list}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="待办"
        emptyText="你已完成所有待办"
        count={2}
        list={list}
        showViewMore
      />
    </NoticeIcon>
  );
};
```

### NoticeIcon API

| 参数                   | 说明            | 类型                                                                 | 默认值 |
|----------------------|---------------|--------------------------------------------------------------------|-----|
| count                | 有多少未读通知       | `number`                                                           | -   |
| bell                 | 铃铛的图表         | `ReactNode`                                                        | -   |
| onClear              | 点击清空数据按钮      | `(tabName: string, tabKey: string) => void`                        | -   |
| onItemClick          | 未读消息列被点击      | `(item: API.NoticeIconData, tabProps: NoticeIconTabProps) => void` | -   |
| onViewMore           | 查看更多的按钮点击     | `(tabProps: NoticeIconTabProps, e: MouseEvent) => void`            | -   |
| onTabChange          | 通知 Tab 的切换    | `(tabTile: string) => void;`                                       | -   |
| popupVisible         | 通知显示是否展示      | `boolean`                                                          | -   |
| onPopupVisibleChange | 通知信息显示隐藏的回调函数 | `(visible: boolean) => void`                                       | -   |
| clearText            | 清空按钮的文字       | `string`                                                           | -   |
| viewMoreText         | 查看更多的按钮文字     | `string`                                                           | -   |
| clearClose           | 展示清空按钮        | `boolean`                                                          | -   |
| emptyImage           | 列表为空时的兜底展示    | `ReactNode`                                                        | -   |

### NoticeIcon.Tab API

| 参数           | 说明          | 类型                                   | 默认值    |
|--------------|-------------|--------------------------------------|--------|
| count        | 有多少未读通知     | `number`                             | -      |
| title        | 通知 Tab 的标题  | `ReactNode`                          | -      |
| showClear    | 展示清除按钮      | `boolean`                            | `true` |
| showViewMore | 展示加载更       | `boolean`                            | `true` |
| tabKey       | Tab 的唯一 key | `string`                             | -      |
| onClick      | 子项的单击事件     | `(item: API.NoticeIconData) => void` | -      |
| onClear      | 清楚按钮的点击     | `()=>void`                           | -      |
| emptyText    | 为空的时候测试     | `()=>void`                           | -      |
| viewMoreText | 查看更多的按钮文字   | `string`                             | -      |
| onViewMore   | 查看更多的按钮点击   | `( e: MouseEvent) => void`           | -      |
| list         | 通知信息的列表     | `API.NoticeIconData`                 | -      |

### NoticeIconData

```tsx | pure
export interface NoticeIconData {
  id: string;
  key: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: any;
  status: string;
}
```

## RightContent

RightContent 是以上几个组件的组合，同时新增了 plugins 的 `SelectLang` 插件。

```tsx | pure
<Space>
  <HeaderSearch
    placeholder="站内搜索"
    defaultValue="umi ui"
    options={[
      {label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui'},
      {
        label: <a href="next.ant.design">Ant Design</a>,
        value: 'Ant Design',
      },
      {
        label: <a href="https://protable.ant.design/">Pro Table</a>,
        value: 'Pro Table',
      },
      {
        label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
        value: 'Pro Layout',
      },
    ]}
  />
  <Tooltip title="使用文档">
    <span
      className={styles.action}
      onClick={() => {
        window.location.href = 'https://pro.ant.design/docs/getting-started';
      }}
    >
      <QuestionCircleOutlined/>
    </span>
  </Tooltip>
  <Avatar/>
  {REACT_APP_ENV && (
    <span>
      <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
    </span>
  )}
  <SelectLang className={styles.action}/>
</Space>
```

# 通用组件

## StepCustom 步骤条

![image-20240816160357209](https://zym-notes.oss-cn-shenzhen.aliyuncs.com/img/image-20240816160357209.png)

| 参数    | 说明    | 类型                    | 默认值 |
|-------|-------|-----------------------|-----|
| style | css样式 | `React.CSSProperties` | -   |
| items | 步骤节点  | `stepItemDataType`    | []  |

stepItemDataType 类型

| 参数          | 说明       | 类型        | 默认值              |
|-------------|----------|-----------|------------------|
| title       | 标题       | `string`  | -                |
| statusName  | 状态名称     | `string`  | -                |
| status      | 状态       | `boolean` | -                |
| textColor   | 审批状态文字颜色 | `string`  | -                |
| description | 子节点      | `string   | React.ReactNode` | -      |

```tsx
const itemsData = [{
  title: '审批名称',
  statusName: '审核通过',
  status: 'true',
  textColor: 'green',
  description: <div style={{color: getTypeName(item.operationType).color}}>
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <span>李四&nbsp;</span><span>2019-08-07 15:34:16</span>
    </div>
    <div>备注</div>
  </div>
},
  {
    title: '审批名称1',
    statusName: '审核通过',
    status: 'true',
    textColor: 'green',
    description: <div style={{color: getTypeName(item.operationType).color}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span>王五&nbsp;</span><span>2019-08-07 15:34:16</span>
      </div>
      <div>备注</div>
    </div>
  },
  {
    title: '审批名称2',
    statusName: '未通过',
    status: 'false',
    description: <div style={{color: getTypeName(item.operationType).color}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span>赵六&nbsp;</span><span>2019-08-07 15:34:16</span>
      </div>
      <div>备注</div>
    </div>
  }]

export default (): React.ReactNode => {
  return <StepCustom
    style={{marginTop: 10, height: 40}}
    items={changeDetails.routing?.beforeAlter?.map((item: procedureDataType) => {
      return {
        title: item.stepName,
        status: true
      }
    }) || []
    }
  />
}
```

## LeftAndRightContent 左右分隔布局

![image-20240816162052072](https://zym-notes.oss-cn-shenzhen.aliyuncs.com/img/image-20240816162052072.png)

| 参数      | 说明   | 类型                                                                | 默认值 |
|---------|------|-------------------------------------------------------------------|-----|
| bgColor | 背景颜色 | `string`                                                          | -   |
| left    | 左侧内容 | `{ title: string, hidden: boolean, content: React.ReactElement }` | {}  |
| right   | 右侧内容 | `{ title: string, hidden: boolean, content: React.ReactElement }` | {}  |

```tsx
<LeftAndRightContent
  left={{
    title: '变更前',
    content: <>
      <div>
        <Descriptions
          title={<div style={{borderBottom: `1px solid ${token.colorPrimary}`, color: token.colorPrimary}}>
            基本信息
          </div>}
          size={"small"}
          column={2}>
          <Descriptions.Item label="工艺路线编码">RT001</Descriptions.Item>
          <Descriptions.Item label="工艺路线名称">工艺001</Descriptions.Item>
          <Descriptions.Item label="工艺模型编码">MD001</Descriptions.Item>
          <Descriptions.Item label="工艺模型名称">模型001</Descriptions.Item>
          <Descriptions.Item
            label="类型">实验</Descriptions.Item>
        </Descriptions>
      </div>
    </>
  }}
  right={{
    title: '变更后',
    content: <>
      <div>
        <Descriptions
          title={<div style={{borderBottom: `1px solid ${token.colorPrimary}`, color: token.colorPrimary}}>
            基本信息
          </div>}
          size={"small"}
          column={2}>
          <Descriptions.Item label="工艺路线编码">RT001</Descriptions.Item>
          <Descriptions.Item label="工艺路线名称">工艺001</Descriptions.Item>
          <Descriptions.Item label="工艺模型编码">MD001</Descriptions.Item>
          <Descriptions.Item label="工艺模型名称">模型001</Descriptions.Item>
          <Descriptions.Item label="变更时间">2019-08-07 15:34:16</Descriptions.Item>
          <Descriptions.Item label="申请人">李四</Descriptions.Item>
        </Descriptions>
      </div>
    </>
  }}
/>
```

## DoubleClickInput 点击切换输入框

![recording](https://zym-notes.oss-cn-shenzhen.aliyuncs.com/img/recording.gif)

| 参数    | 说明 | 类型    | 默认值 |
|-------|----|-------|-----|
| value | 值  | `any` | -   |

| 事件       | 说明     | 类型         | 默认值                   |
|----------|--------|------------|-----------------------|
| onChange | 数据变化回调 | `Function` | (value: string) => {} |

```tsx
const columns = [{
  title: '标准值',
  dataIndex: 'standardValue',
  valueType: 'text',
  render: (_, record) => <DoubleClickInput
    value={record.standardValue}
    onChange={(value) => {
      record.standardValue = value
    }}
  />,
  width: 50,
}]

export default (): React.ReactNode => {
  return <Table
    size="small"
    dataSource={[{
      standardValue: 1
    }]}
  />
}
```

## GanttChart 甘特图

![recording](https://zym-notes.oss-cn-shenzhen.aliyuncs.com/img/recording1.gif)

| 参数                     | 说明              | 类型                                               | 默认值          |
|------------------------|-----------------|--------------------------------------------------|--------------|
| data                   | 数据              |                                                  |              |
| tableColumns           | 左侧表格展示的列columns | `TableColumnsType<GanttType.GanttDataType<any>>` | -            |
| tableWidth             | 左侧表格宽度          | `number`                                         | -            |
| viewMode               | 试图模式            | `ViewMode`                                       | ViewMode.Day |
| defaultExpandedRowKeys | 默认展开的行          | `string []`                                      |              |

| 事件               | 说明       | 类型                                         | 默认值                      |
|------------------|----------|--------------------------------------------|--------------------------|
| onExpandedChange | 展开的行变化回调 | (expandedRows) => void;                    | (expandedRows) => {}     |
| handleSelect     | 选择的行变化回调 | (task: Task, isSelected: boolean) => void; | (task, isSelected) => {} |
| onDataChange     | 数据变化回调   | (data: GanttDataType<T>[]) => void;        | (data) => {}             |

ViewMode

| 参数         | 说明               |
|------------|------------------|
| Hour       | 小时               |
| QuarterDay |                  |
| HalfDay    |                  |
| Day        | 天                |
| Week       | 周（ISO-8601 week） |
| Month      | 月                |
| Year       | 年                |

```tsx
const FormBuilder: React.FC<FormBuilderProps> = () => {

  const GanttData: GanttType.GanttDataType<any>[] = [
    {
      key: 'Task1',
      id: 'Task1',
      type: 'project',
      // 完成度
      progress: 45,
      name: "task1",
      start: new Date("2018-04-18 03:27:49"),
      end: new Date("2018-04-18 04:34:50"),
      styles: {
        backgroundColor: '#ffde82'
      },
      children: [
        {
          key: 'Task2',
          id: 'Task2',
          type: 'task',
          // 完成度
          progress: 10,
          name: "task2",
          dependencies: ['Task1'],
          project: 'Task1',
          start: new Date("2018-04-18 03:27:49"),
          end: new Date("2018-04-18 04:41:50"),
          styles: {
            backgroundColor: '#ffde82'
          }
        },
        {
          key: 'Task3',
          id: 'Task3',
          type: 'task',
          // 完成度
          progress: 10,
          name: "task3",
          dependencies: ['Task1'],
          project: 'Task1',
          start: new Date("2018-04-18 04:27:49"),
          end: new Date("2018-04-18 07:41:50"),
          styles: {
            backgroundColor: '#ffde82'
          }
        },
        {
          key: 'Task4',
          id: 'Task4',
          type: 'task',
          // 完成度
          progress: 10,
          name: "task4",
          dependencies: ['Task1'],
          project: 'Task1',
          start: new Date("2018-04-18 06:27:49"),
          end: new Date("2018-04-18 07:41:50"),
          styles: {
            backgroundColor: '#ffde82'
          }
        }
      ]
    }
  ];

  const listColumns: TableColumnsType<GanttType.GanttDataType<any>> = [
    {
      title: '任务名称',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '开始时间',
      dataIndex: 'start',
      width: 150,
      ellipsis: true,
      render: (start: Date) => {
        return start.toLocaleString()
      }
    },
    {
      title: '结束时间',
      dataIndex: 'end',
      width: 150,
      ellipsis: true,
      render: (start: Date) => {
        return start.toLocaleString()
      }
    }
  ];
  const [data, setData] = useState(GanttData);

  return (
    <>
      {/*甘特图*/}
      <GanttChart tableColumns={listColumns}
                  tableWidth={450}
                  data={data}
                  viewMode={ViewMode.Hour}
                  defaultExpandedRowKeys={['Task1']}
                  onExpandedChange={(expandedRows) => {
                    console.log(expandedRows, 111)
                  }}
                  handleSelect={(task, isSelected) => {
                    console.log(task, isSelected)
                  }}
                  onDataChange={(data) => {
                    console.log(data)
                  }}
      />
    </>
  );
};

export default FormBuilder;
```

