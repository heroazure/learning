/**
 * Created by xiaolijun on 2015/11/22.
 */
define(function (require, exports, module) {
    var $=require("../plugin/jquery.js");

    function Store(selector) {
        this.target=selector||".js-store";
        this.$hint=$('<div class="hint">'+'收藏成功!'+'</div>').appendTo('body');

    }
    module.exports= Store;

    Store.prototype.init= function (callback) {
        var that=this;
        $(document).on("click", that.target, function (e) {
            var $this = $(this),
                $hint = that.$hint,
                stone_id = $this.data("id");
            if ($this.hasClass("active")) {
                $.post('/stone/cancel_favorite/' + stone_id, {}, function (json, status) {
                    if (status) {
                        $this.removeClass("active");
                        $hint.text("已取消收藏!");
                        that.animate();
                        callback&&callback();
                    } else {
                    }
                }, 'json');
            } else {
                $.post('/stone/add_favorite/' + stone_id, {}, function (json, status) {
                    if (status) {
                        $this.addClass("active");
                        $hint.text("收藏成功!");
                        that.animate();
                    } else {
                    }
                }, 'json');
            }

            e.preventDefault();
        });
    }

    Store.prototype.animate=function () {
        var $hint=this.$hint;
        if ($hint.hasClass("hintAnimate")) {
            $hint.removeClass("hintAnimate");
            setTimeout(function () {
                $hint.addClass("hintAnimate")
            }, 10);
        } else {
            $hint.addClass("hintAnimate")
        }
        $hint.one("animationend webkitAnimationEnd", function () {
            $hint.removeClass("hintAnimate");
        });
    }

});