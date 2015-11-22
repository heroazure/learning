/**
 * Created by xiaolijun on 2015/10/21.
 */
define(function (require, exports, module) {
    //var $ = require("jquery");
    //require("mustache");
    //require("bootstrap");
    //require("swiper");
    //require("tap");
    function home() {
        this.ob = {
            category: $(".js-category"),
            categorySearch: $(".category-search"),
            statusSearch: $(".status-search"),
            sortSearch: $(".sort-search"),
            status: $(".js-status"),
            categoryList: $("#categoryList"),
            statusList: $("#statusList"),
            modalBackdrop: $(".modal-backdrop"),
            sort: $(".js-sort"),
            sortList: $("#sortList"),

            categoryTpl: $("#categoryTpl"),
            statusTpl: $("#statusTpl"),
            proListTpl: $("#proListTpl"),

            hint: $(".hint")
        }
    }

    module.exports = home;

    home.prototype.init = function () {
        this.topSwiper();
        var that = this;
        /**
         * 获取所有类别
         */
        this.ob.category.on("click", function () {
            that.ob.categorySearch.addClass("active");
            that.ob.modalBackdrop.show();

            ajax("/category/all", that.ob.categoryTpl, that.ob.categoryList);
        });
        /**
         * 根据类别查询
         */
        this.ob.categoryList.on("click", ".row", function () {
            var b = $(this).data("cateid");
            that.ob.modalBackdrop.click();
            $.ajax({
                dataType: "Json",
                url: "/stone/category/" + b,
                success: function (json) {
                    var data = json.data;
                    if (data && Array.isArray(data) && data.length) {
                        dealStatus(data);
                        var tpl = that.ob.proListTpl.html();
                        Mustache.parse(tpl);
                        var render = Mustache.render(tpl, {"items": data});
                        $("#proList").find(".category").siblings().remove().end().end().append(render);
                    } else {
                        $("#proList").find(".category").siblings().remove();
                    }
                }
            });
        });

        /**
         * 根据状态查询
         */
        this.ob.statusList.on("click", ".row", function () {
            var b = $(this).data("statusid");
            that.ob.modalBackdrop.click();
            $.ajax({
                dataType: "Json",
                url: "/stone/status/" + b,
                success: function (json) {
                    var data = json.data;
                    if (data && Array.isArray(data) && data.length) {
                        dealStatus(data);
                        var tpl = that.ob.proListTpl.html();
                        Mustache.parse(tpl);
                        var render = Mustache.render(tpl, {"items": data});
                        $("#proList").find(".category").siblings().remove().end().end().append(render);
                    } else {
                        $("#proList").find(".category").siblings().remove();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus);
                    //that.ob.modalBackdrop.click();
                }
            });
        });

        /**
         * 获取所有状态
         */
        this.ob.status.on("click", function () {
            that.ob.statusSearch.addClass("active");
            that.ob.modalBackdrop.show();

            ajax("/stone/get_all_status", that.ob.statusTpl, that.ob.statusList);
        });


        /**
         * 显示所有排序
         */
        this.ob.sort.on("click", function () {
            that.ob.sortSearch.addClass("active");
            that.ob.modalBackdrop.show();
        });

        /**
         * 根据排序查询
         */
        this.ob.sortList.on("click", ".row", function () {
            var b = $(this).data("sortid"),
                url = b == "0" ? "/stone/all" : "/stone/order_by_favtimes";
            that.ob.modalBackdrop.click();
            $.ajax({
                dataType: "Json",
                url: url,
                success: function (json) {
                    var data = json.data;
                    if (data && Array.isArray(data) && data.length) {
                        dealStatus(data);
                        var tpl = that.ob.proListTpl.html();
                        Mustache.parse(tpl);
                        var render = Mustache.render(tpl, {"items": data});
                        $("#proList").find(".category").siblings().remove().end().end().append(render);
                    } else {
                        $("#proList").find(".category").siblings().remove();
                    }
                }
            });
        });

        /**
         * 开宝预告内容列表的加载
         */
        $("#forecastTab").on("click", function () {
            $.ajax({
                dataType: "Json",
                url: "/stone/get_status_one",
                success: function (json) {
                    var data=json.data;
                    var tpl = $("#forecastTpl").html();
                    Mustache.parse(tpl);
                    var render = Mustache.render(tpl, {"items": data});
                    $("#forecastContent").html(render);
                }
            });
        });
        /**
         * 开宝公示内容列表的加载
         */
        $("#publicTab").on("click", function () {
            $.ajax({
                dataType: "Json",
                url: "/stone/get_status_two",
                success: function (json) {
                    var data=json.data;
                    var tpl = $("#publicTpl").html();
                    Mustache.parse(tpl);
                    var render = Mustache.render(tpl, {"items": data});
                    $("#publicContent").html(render);
                }
            });
        });

        $(".modal-backdrop").on("click", function () {
            $(this).hide();
            that.ob.categorySearch.removeClass("active");
            that.ob.statusSearch.removeClass("active");
            that.ob.sortSearch.removeClass("active");
        });

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

        $(document).on("click", ".js-store", function (e) {
            var $this = $(this),
                $hint = that.ob.hint,
                stone_id=$this.data("id");
            if($this.hasClass("active")){
                $.post('/stone/cancel_favorite/'+stone_id, {}, function (json, status) {
                    if (status) {
                        $this.removeClass("active");
                        $hint.text("已取消收藏!");
                    }else{
                    }
                }, 'json');
            }else {
                $.post('/stone/add_favorite/'+stone_id, {}, function (json, status) {
                    if (status) {
                        $this.addClass("active");
                        $hint.text("收藏成功!");
                    }else{
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
    }

    home.prototype.render = function () {
        this.init();
    }

    /**
     * 首页顶部的轮播图片
     */
    home.prototype.topSwiper = function () {
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
    function ajax(url, tepl, target) {
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
                //alert(textStatus);
            }

        });
    }

    /**
     * 根据原石状态给每一项添加一个class，以展示当前状态
     * @param data
     */
    function dealStatus(data) {
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