/**
 * Created by Administrator on 2015/9/17.
 */
+function ($) {
    $.extend({
        upordown: function (e) {//滚轮向上滚动返回1，向下返回-1
            e=e || window.event;

            if(e.wheelDelta){//IE/Opera/Chrome向上返回120，向下返回-120
               return e.wheelDelta>0?1:-1;
            }else if(e.detail){//Firefox向上返回-3，向下返回3
               return e.detail<0?1:-1;
            }
        }
    });
}(jQuery);