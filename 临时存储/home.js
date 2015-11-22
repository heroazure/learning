/**
 * Created by xiaolijun on 2015/10/21.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    var store=require("store");
    require("mustache");
    require("bootstrap");
    require("swiper");
    require("tap");
    function home() {
        this.ob = {}
    }

    module.exports = home;

    home.prototype.init = _init;

    function _init() {

        _topSwiper();
        _loadForecast();
        _loadPublic();
        _footertab();
        new store().init();
    }

    /**
     * 开宝预告内容列表的加载
     */
    function _loadForecast() {

        $("#forecastTab").on("click", function () {
            $.ajax({
                dataType: "Json",
                url: "/stone/get_status_one",
                success: function (json) {
                    var data = json.data;
                    var tpl = $("#forecastTpl").html();
                    Mustache.parse(tpl);
                    var render = Mustache.render(tpl, {"items": data});
                    $("#forecastContent").html(render);
                }
            });
        });
    }

    /**
     * 开宝公示内容列表的加载
     */
    function _loadPublic() {
        $("#publicTab").on("click", function () {
            $.ajax({
                dataType: "Json",
                url: "/stone/get_status_two",
                success: function (json) {
                    var data = json.data;
                    var tpl = $("#publicTpl").html();
                    Mustache.parse(tpl);
                    var render = Mustache.render(tpl, {"items": data});
                    $("#publicContent").html(render);
                }
            });
        });
    }

    /**
     * 底部tab切换块
     * @private
     */
    function _footertab() {

        /**
         * 切换效果
         */
        $("#footerBar li").on("click", function () {

            var $this = $(this);
            location.href = "#" + $this.data("target");
            var index = $this.parent().find("li").index(this);

            var $pane = $(".tab-content.js-content>.tab-pane");
            if (index == 3) {
                $("#forecastTab").click();
            }

            $pane.removeClass("active").eq(index).addClass("active");
            $this.siblings().removeClass("active2").end().addClass("active2");
        });

        /**
         * 定位到当前url路由对应的块
         */
        $("#footerBar").find('[data-target="' + location.href.split("#")[1] + '"]').click();
    }

    /**
     * 原石收藏
     * @private
     */
    /*function _store() {
        $(document).on("click", ".js-store", function (e) {
            var $this = $(this),
                $hint = $(".hint"),
                stone_id = $this.data("id");
            if ($this.hasClass("active")) {
                $.post('/stone/cancel_favorite/' + stone_id, {}, function (json, status) {
                    if (status) {
                        $this.removeClass("active");
                        $hint.text("已取消收藏!");
                    } else {
                    }
                }, 'json');
            } else {
                $.post('/stone/add_favorite/' + stone_id, {}, function (json, status) {
                    if (status) {
                        $this.addClass("active");
                        $hint.text("收藏成功!");
                    } else {
                    }
                }, 'json');
            }

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
            e.preventDefault();
        });
    }*/

    /**
     * 首页顶部的轮播图片
     */
    function _topSwiper() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
//            nextButton: '.swiper-button-next',
//            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 2,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    }

    /**
     * 简单的一个通用ajax
     * @param url
     * @param tpl
     * @param target
     */
    function _ajax(url, tepl, target) {
        $.ajax({
            dataType: "Json",
            url: url,
            success: function (json) {
                var data = json.data,
                    tpl = tepl.html();
                Mustache.parse(tpl);
                var render = Mustache.render(tpl, {"items": data});
                target.html(render);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }

        });
    }

    /**
     * 根据原石状态给每一项添加一个class，以展示当前状态
     * @param data
     */
    function _dealStatus(data) {
        $.each(data, function (index, item) {
            switch (item.status) {
                case "1":
                    item.cls = "preview";
                    break;
                case "2":
                    item.cls = "purchase";
                    break;
                case "3":
                    item.cls = "open";
                    break;
                case "4":
                    item.cls = "huigou";
                    break;
                case "5":
                    item.cls = "jiesuan";
                    break;
                default :
                    item.cls = "preview";
                    break;
            }
        });
    }
});