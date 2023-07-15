# model-visualization

> 项目 TODO: [TODO.md](./TODO.md)

本项目主要基于 React18 构建，全部使用函数式组件，大量使用自定义 Hook 进行逻辑抽象和封装，包括异步 API 封装、WebSocket 调用、echarts 调用等通用逻辑都使用 Hook 进行封装，基本可以保证函数式组件内部代码是纯视图相关的。

语法方面使用 Typescript，基于 API 文档创建了相关类型说明，尽量避免了使用`any`类型。

项目使用前后端分离的 C/S 模式，前端采用单页面应用（SPA）和客户端渲染（CSR）的方式，；后端基于 Flask 构建，符合 RESTful API 规范。

前端项目构建工具使用现代化的 Vite + SWC 工具链，使用 Rust 和 Go 加快了前端的构建速度，顺便使用 Vite 内建的 `http_proxy` 功能解决了跨域反向代理的问题。

本项目基础组件库为 Joy UI，使用了 emotion 作为 CSS-in-JS 解决方案，完全避免了书写单独的 CSS 类，并在组件库的基础上进一步抽象出了专用的通用组件，如 `FormInput` 用于处理表单输入、`Collapse` 用于可折叠的内容、`LoadingScreen` 用于异步获取的内容等。

## How to run

```shell
$ pnpm install
$ pnpm run dev
```

### 测试账号

- local 账号（不需要服务端验证）
  - 用户名：local
  - 不需要密码（不验证密码）
- admin 账号
  - 用户名：admin
  - 密码：admin
