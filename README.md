# 适配于若依的 React 版本前端

## 基础框架：Ant Designer Pro

[Ant Design Pro](https://pro.ant.design/) 是基于 Ant Design 设计体系的 React UI 组件库，主要用于快速开发企业后台产品原型。

## 微服务切换

1、配置 `config/proxy.ts` 中的代理

2、请根据实际情况修改 `config/modulePath.ts` 相关模块路径

## 安装依赖

```bash
# 推荐：
yarn
# npm
npm install
```

## 启动项目

```bash
npm run dev
```

# 配置

## logo 和 标题

### 修改 defaultSettings

`config/defaultSettings.ts` 中可以配置 logo 和标题。

### 修改 app.tsx

`config/defaultSettings.ts` 中无法引入本地文件，如需引入本地 logo，需要删除 `config/defaultSettings.ts` 中的 logo
配置，并修改 `src/app.tsx` 文件。

```tsx
import logo from '../public/logo-g.svg';

export const layout = ({initialState, setInitialState}) => {
  return {
    // 自定义 logo，设置为 false 可以关闭 logo
    logo: logo,
    ...
  }
}
```

## 多级菜单

页面中多级菜单中的路由地址不要以 `/` 开头，父级地址和子级地址之间的 `/` 需要去掉。

注意：父级地址 + 子级地址 + 子级地址 = 路由地址

### 例如

```tsx
// routes.tex 配置
export default [{
  path: '/system',
  icon: 'BugOutlined',
  routes:
    [
      {
        name: 'dictdata',
        icon: 'PartitionOutlined',
        path: '/system/dict/data/:id',
        component: 'system/dictData/index',
        access: 'authorize',
        KeepAlive: true,
        title: 'menu.title.dictData'
      },
    ]
}]
```

二级菜单路配置：

```text
一级菜单-路由地址：system
二级菜单-路由地址：dict/data/:id
```

三级菜单路配置：

```text
一级菜单-路由地址：system
二级菜单-路由地址：dict
三级菜单-路由地址：data/:id
```

