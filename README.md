# js-common

npm version patch
npm pack
npm install /Users/junyang7/env/js-common/js-common-1.0.0.tgz

# 本地模式 link

在js-common项目根目录执行
```shell
npm link
```

在项目根目录中使用
```shell
npm link js-common
```

WebStorm提示

Preferences -> Languages & Frameworks -> JavaScript -> Libraries
Add...
Visibility
选择js-common项目路径位置
global即可


# 本地模式 pack
在js-common根目录

1、调整package.js中version版本号
2、打包
```shell
npm patch
```
3、得到文件：js-common.xxx.tgz

在项目根目录运行更新
```shell
cnpm install <path/to/js-common.xxx.tgz> --force
```

# 远程仓库模式
1、js-common修改后推送带git仓库
2、更新安装：npm install git+https://github.com/path/to/js-common.git

