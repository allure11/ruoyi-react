# 适配于若依的 React 版本前端

## 基础框架：Ant Designer Pro

[Ant Design Pro](https://pro.ant.design/) 是基于 Ant Design 设计体系的 React UI 组件库，主要用于快速开发企业后台产品原型。

## 微服务切换

1、配置 config/proxy.ts 中的代理

2、请根据实际情况修改 src/services/ant-design-pro 中相关接口的地址

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
