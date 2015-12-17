/**
 * Created by Administrator on 2015/12/15.
 */
function _scrollVertical(optional,callback) {
    var startPos,
        endPos,
        isScrolling,
        slider = document.getElementById(optional.id);
    var start = function (event) {
        var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        startPos = {x: touch.pageX, y: touch.pageY, time: +new Date}; //取第一个touch的坐标值
        slider.addEventListener('touchmove', move, false);
        slider.addEventListener('touchend', end, false);
    };
    var move = function (event) {
//当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if (event.targetTouches.length > 1 || event.scale && event.scale !== 1)return;

        var touch = event.targetTouches[0];
        endPos = {x: touch.pageX - startPos.x, y: touch.pageY - startPos.y};
        isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        if (isScrolling === 1) {
            //event.preventDefault();
        }
    };
    var end = function (event) {
        var duration = +new Date - startPos.time; //滑动的持续时间
        if (isScrolling === 1) { //当为纵向滚动时
            if (Number(duration) > 10) {
//判断是左移还是右移，当偏移量大于10时执行
                if (endPos.y > 10) {
                    callback();
                }
            }
        }
//解绑事件
        slider.removeEventListener('touchmove', move);
        slider.removeEventListener('touchend', end);
    };

    var touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    if (!!touch)
        slider.addEventListener('touchstart', start);
}