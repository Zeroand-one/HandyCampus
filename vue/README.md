# my-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).





##### 页面

​	404.html

​	500.html

##### 功能

- 登陆
- 注册
  - 昵称
  - 邮箱
  - 密码
  - 确认密码

- 用户管理
  - id
  - 昵称
  - 手机号
  - 创建时间
- 模块列表
  - 增加模块
  - id
  - 模块名称
  - 文章数量
  - 操作（修改，删除）
    - 只能修改模块名词
- 资讯列表
  - 创建文章
    - 选择模块
    - 标题
    - 封面
    - 详情
  - 模块分级（次导航切换）
  - 对应模块文章列表
    - id
    - 标题
    - 封面
    - 浏览量
    - 收藏量
    - 创建时间
    - 修改时间
    - 操作（查看，修改，删除）
- 个人中心
  -  账号（不可编辑）
  - 密码
  - 头像