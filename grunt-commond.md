1、首先安装最新的node.js(自带了npm)
2、全局安装grunt-cli
>>npm install grunt-cli -g
3、cd到项目根目录
3.1、已有package.json文件的情况执行:
>>npm install
3.2、没有package.json文件的情况可以执行(按照屏幕提示回答所需模块的名称和版本即可):
>>npm init
然后通过package.json文件配置devDependencies属性或者执行:
>>npm install <module> --save-dev(记得最先安装grunt模块，--save-dev会自动将模块名/版本加入package.json文件)
示例:
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-watch --save-dev
4、执行模块任务
4.1、默认任务下某个模块
>>grunt <moduleName>
4.2、执行某个任务
>>grunt <taskName>