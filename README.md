### 食药监局CFDA项目Web端

本项目必须和食药监局[后台API](https://github.com/s1n1an/cfda-server)配套使用
Github克隆或下载本项目后，使用前必须修改项目根目录下的`.env`配置文件

本系统依赖百度地图API，需要[申请](http://lbsyun.baidu.com/apiconsole/key)百度地图Key
配置文件中的`VUE_APP_BDMAP_KEY`即为百度地图申请的Key
配置文件中的`VUE_APP_CITY_NAME`即为百度地图默认的中心城市

在cmd指令中使用`cd`进入本项目根目录
初次使用必须安装环境与依赖：
```
npm i
```
依赖环境只需要安装一次

运行测试服务器：
```
npm run serve
```

打包：
```
npm run build
```
这会产生一个`dist`目录，其中的文件即可部署在静态服务器上
注意部署时的API地址可能和开发时不同
Vue-cli支持配置不同环境的`.env`文件，可以查看[文档](https://cli.vuejs.org/zh/guide/mode-and-env.html#模式)