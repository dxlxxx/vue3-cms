# vue3+ts+axios+router+vuex+element plus

## 用户分权常见的 4 种方式

### 注册所有路由

1.  把所有的路由的注册
2.  根据后端数据生成菜单

> 缺点：如果用户更改 url 就会进入需要权限的页面

### 后端返回组件名的路径

1.  根据后端的映射关系生成路由

> 缺点：路由名字不能乱更改

### 根据角色生成路由

1.  根据后端返的角色，来生成不同的路由
2.  前端配置角色和路由的映射表

> 缺点：后期添加角色，需要更改前端代码

### 根据菜单生成路由

1.  根据后端返的菜单，来生成不同的路由
2.  前端生成所有路由的数组
3.  根据菜单 url 来生成需要注册的路由数组/根据后端给的组件名
4.  生成动态路由
