背景

    移动前端适配一直困扰很多人，我自己也是从最初的媒体查询，到后来的百分比，再到padding-top这种奇巧淫技，再到css3新单位vw这种过渡转变 但这些都或多或少会有些问题，直到使用了动态rem 才真正不再在适配这个问题上发愁 只因为叫动态rem 是因为他是真正意义上随着屏幕的大小来变化的。

rem
rem官方解释是 font size of the root element 字面意思就是 根元素的font-size值 也就是rem是相对于元素的

如下代码

<html>
  <meta charset="utf-8"/>
  <head>
    <style>
       html{ font-size:10px;}
       .p1{font-size:1rem;}
        .p2{ font-size:2rem;}
    </style>
   </head>
   <body>
      <p class="p1">这是一个1rem字体</p>
      <p class="p2">这是一个2rem的字体</p>
   </doby>
</html>

从最终效果可以看出文档中元素的字体大小是基于html根元素的 p1的font-size为10px p2的font-size是20px
viewport

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

在移动开发时我们都会有上面这段代码

    viewport :虚拟窗口大小
    width: 控制viewport大小 可以自己设定值如320px(很少用) 一般设置为device-width(设备宽度)
    initial-scale 初始缩放比例 即页面初次加载时的缩放比例默认为1
    maximum-scale：用户可缩放到的最大比例

dpr(device pixel ratio)

设备像素比dpr 要了解这一概念还得清楚另外两个概念

    设备物理像素
    通俗的讲设备屏幕有多少个可以闪烁的点 是一个具体的概念 比如iphone6横向就有750个可以改变颜色的点 类似与电视机 如果家里有10年前买的大头电视，你趴在屏幕前仔细看能看到一个个RGB的点 这就是设备的物理像素
    设备独立像素

    设备独立像素是一个虚拟的概念，如程序中的css 比如我们将一个div宽度设置为10像素 那么在pc上系统会将这个div显示在屏幕的10个点上

        dpr = 设备物理像素/设备独立像素

        程序中的1px占据设备上的几个最小物理点可以这么理解

        iphone3G 设备物理像素320个点 设备独立像素320px 那么dpr就是1

        iphone6 设备物理像素750个点 设备独立像素375px 那么dpr就是2

        也就是我们css中写的1px其实不等于设备实际上的那1px 也可能等于设备上的2px

        根据dpr我们就可以灵活的在移动端缩放页面比例

        可以通过window.devicePixelRatio来获取dpr

动态rem

    通过上面的rem,viewport,以及dpr我们就可以完成我们的终极适配了，告别死板写法 不再这样写死 我们知道了设备的dpr就可以明确的知道缩放多少，而且这样还解决了很难解决的1px横线的问题

我们需要这样一段js代码

(function (doc, win) {
 console.log("dpr:"+win.devicePixelRatio);
 var docEle = doc.documentElement,
 isIos = navigator.userAgent.match(/iphone|ipod|ipad/gi),
 dpr=Math.min(win.devicePixelRatio, 3);
 scale = 1 / dpr,

 resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';

 docEle.dataset.dpr = dpr;

 var metaEle = doc.createElement('meta');
 metaEle.name = 'viewport';
 metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
 docEle.firstElementChild.appendChild(metaEle);


 var recalCulate = function  {
 var width = docEle.clientWidth;
 if (width / dpr > 640) {
 width = 640 * dpr;
 }
 docEle.style.fontSize = 20 * (width / 750) + 'px';
 };

 recalCulate

 if (!doc.addEventListener) return;
 win.addEventListener(resizeEvent, recalCulate, false);
        })(document, window);

    获取设备dpr
    算出缩放比例 scale = 1/dpr
    创建meta以及属性
    将scale值赋给initial-scale，maximum-scale
    meta插入到文档中
    创建屏幕大小改变重新计算函数并监听

最终效果

使用sass同步psd

当我们拿到psd的时候可能要把psd的图尺寸转换为rem，之前一个同事有一个很好的方法可以完全按照psd的的尺寸来书写，但要用到sass，使用sass可以大大提高开发效率，下面是sass的一个mixin方法将rem和px做了转换 如下hotcss.scss

@function px2rem( $px ){
    @return $px*750/$designWidth/20 + rem; //这句是不是感觉很熟悉 这句其实跟上面的那段js是对应的
}
$designWidth : 750; //如设计图是750

在我们的style.scss中

@import 'px2rem.scss';
$designWidth : 750; //如设计图是750
.banner{width:px2rem(300)}//如设计稿上的banner是300px 就免去计算环节