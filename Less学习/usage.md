1、安装全局less
>>npm install -g less
2、预编译文件
>>lessc style.less style.css
3、预编译并压缩
3.1、clean-css plugin
npm命令行:npm install -g less-plugin-clean-css
3.2、执行命令
>>lessc --clean-css style.less style.min.css