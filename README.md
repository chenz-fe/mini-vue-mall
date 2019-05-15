## mini-vue-mall

一个基于Vue.js的小型商城项目，包含登录、商品列表、购物车页面，数据为本地mock。

### 技术栈

- Vue.js
- vue-router
- Vuex
- cube-ui

### 登录

- 登录账号：dora 密码：123
- 全局路由守卫
- Vuex管理登录信息
- 页面借助cube-ui的表单组件搭建
- http拦截器，将token加入请求头中，响应拦截器处理登录失败的情况

### 首页

- 轮播图
- 商品列表，含过滤筛选商品功能
- 商品图片可预览
- 购物车数据通过Vuex实现全局共享

### 购物车动画

- 借助Vue.js transition的三个动画钩子来用js控制动画
- 实现思路
  - GoodsLIst.vue组件点击加购按钮时，派发一个事件
  - 通过这个事件，可以得到点击位置的坐标，这个坐标就是小球的起始位置，购物车图标为小球的终止位置

### 公共

#### 通用 Header 组件

- 自己实现一个Vue插件`src/utils/history.js`，通过堆栈的方式维护页面跳转的历史记录，控制返回跳转
- 点击返回按钮是出栈操作
- 在全局路由router.js 中，实例化路由前，通过原型扩展router的back()方法
- 在全局afterEach中存放历史记录

#### 底部tab，监听路由变化

将tab的value和路由的路径定义成相同的，这样切换tab，拿到当前的tab的value，如`/cart`，使用`this.$router.push(value)`，就可以切换页面了

#### 页面切换滑动动画

动态绑定transition的name，根据当前是正常跳转页面还是返回页面操作，决定页面是左滑还是右滑

```html
<transition :name="transitionName">
   <router-view class="child-view" />
</transition>
```

### 用到的cube-ui组件
- cube-tabs
- cube-slide
- cube-drawer
- cube-form
- cube-image-preview


