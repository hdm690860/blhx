# HTML+CSS/LESS+JS/JQuery+NodeJs+MongoDB 搭建的碧蓝航线网站


### 基于Nodejs的练习项目
> 技术栈 Node.js + Express + MongoDB + Jade + Bootstrap + jQuery + grunt


####   项目前端搭建:
* 使用jQuery和Bootsrap完成网站前端JS脚本和样式处理；
* 前后端的数据请求交互通过Ajax完成；
* 引入了Moment.js格式化前端页面显示时间；
#### 项目后端搭建:
* 使用NodeJs的express框架完成碧蓝航线网站后端搭建；
* 使用mongodb完成数据存储，通过mongoose模块完成对mongodb数据的构建；
* 使用jade模板引擎完成页面创建渲染；
* 使用Moment.js格式化角色存储时间；
#### 本地开发环境搭建:
* 使用grunt集成grunt-contrib-watch/grunt-nodemon/grunt-concurrent实现实时刷新及服务器的自动重启等功能
#### 网站整体功能:
首页使用图片预加载，加载页面有进度条和进度数值
首页使用css3的rem单位，适配1920-1200分辨率屏幕显示一致的效果。
网站正常访问无需管理员权限，对角色的评论，需要用户登录，对网站数据的修改添加删除需要管理员的权限(role > 50)，具体功能如下：
* 实现了用户的基本注册，登录，登出及管理功能；
* 实现登录跳转回当前页面功能
* 实现了搜索功能，模糊关键字搜索，类型搜索，角色编号搜索功能；
* 用户登录做session处理；
* 用户可以对角色进行评论；
* 评论为异步处理，不会刷新页面
* 对评论作分页处理，分页查询数据库数据；
* 管理员可以对网站数据进行增加删除修改；
* 添加图片异步上传和同步上传功能
* 管理员可从后台查看所有的角色、用户、评论、等数据；
### 网站整体效果
![](http://tc.ffsky.net/images/2018/02/20/4ed51f7efe277ff318bc34cbf7b9ec44.jpg)  
![](http://tc.ffsky.net/images/2018/02/20/5f38afd1d87380b35f911fc59aacd527.jpg) 
![](http://tc.ffsky.net/images/2018/02/20/409e99377a3187edb07d01d912a10df9.jpg) 
![](http://tc.ffsky.net/images/2018/02/20/6b1b2dc2843789bc659f4f7ca4cc83b3.jpg) 
![](http://tc.ffsky.net/images/2018/02/20/9823ca408952d8b23b6deeecd5db671b.jpg) 
![](http://tc.ffsky.net/images/2018/02/20/33f2fec2a064111ad303d3f3e1ed9987.jpg) 
![](http://tc.ffsky.net/images/2018/02/20/7c3324eebba6e2ef2383cc45cd63023d.jpg) 
![](http://tc.ffsky.net/images/2018/02/20/0f28c0cef6e3cc239e813077e8aeb7e1.jpg) 
#### 运行环境
> $ npm install <br>
> $ grunt <br>
注意：因为需要连接本地数据库数据(localhost:27017/blhx)，本项目下载运行只能展示网站部分功能，后续会添加线上数据库或网站上线地址。。
``` bash
├─app
│  ├─control
│  ├─models
│  ├─schemas
│  └─utility
├─public
│  ├─js
│  ├─libs
│  │  ├─boostrap
│  │  ├─jQuery
│  ├─style
│  ├─video
├─view
│  ├─includes
│  └─pages
app.js
index.html
```
