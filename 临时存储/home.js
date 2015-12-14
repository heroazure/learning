/**
 * Created by xiaolijun on 2015/10/21.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    var store = require("store");
    require("mustache");
    require("bootstrap");
    require("swiper");
    //require("tap");
    function home() {
    }

    var ob = {
        $submit: $("#withdraw_submit"),
        $carryonTpl: $("#carryonTpl"),
        $previewTpl: $("#previewTpl"),
        $finishTpl: $("#finishTpl"),
        $forecastTpl:$("#forecastTpl"),
        $publicTpl:$("#publicTpl"),
        $noforecastTpl:$("#nodatatpl"),
        $nopublicTpl:$("#nopublictpl")
    };

    var isClick;

    module.exports = home;

    home.prototype.init = _init;

    function _init() {
        _topSwiper();
        _publicForecastPane();
        _footertab();
        _confirm();
        new store().init();
        _loadMore();
        _popstate();
    }

    function _popstate(){
        //该事件捕获浏览器历史纪录url的变化，处理主页面返回键的问题
        window.onpopstate = function(event) {
            //这个判断是为了解决$("#public-nav>li>a")开宝预告被重复出发两次，而且是同时刻执行，导致数据重复
            if(!isClick){
                _location();
            }
        }
    }

    /**
     * 定位tab
     * @private
     */
    function _location(){
        var target=location.href.split("#")[1];
        if(target){
            $("#footerBar").find('[data-target="' + target + '"]').click();
        }else {
            $("#footerBar").find('[data-target="home"]').click();
        }
    }

    function _confirm() {
        ob.$submit.on("click", function () {
            $.post('/withdraw/url_moneyout', {}, function (data, status) {
                if (status) {
                    switch (data + "") {
                        case "1":
                            window.location.href = "/withdraw/moneyOut";
                            break;
                        case "2":
                            alert("请先设置账户安全验证");
                            window.location.href = "/user/accountSecurity";
                            break;
                        case "3":
                            alert("你的实名验证正在审核中,无法提现");
                            break;
                        default:
                            ob.$alert.text("未知错误").show();
                            break;
                    }
                }
            });
        })
    }

    /**
     * 开宝公示及开宝预告
     * @private
     */
    function _publicForecastPane(){
        $("#public-nav>li>a").on("click", function () {
            var $this=$(this);
            if($this.attr("href")=="#forecastContent"){
                if($("#forecastContent").children("a.item").length>0){
                    return;
                }else{
                    _loadDataPage({
                        url:"/stone/get_kaibao_start",
                        tpl:ob.$forecastTpl.html(),
                        $loadMore:$("#load-more-forecast"),
                        emptyTpl:ob.$noforecastTpl.html(),
                        $targetContainer:$("#forecastContent"),
                        page:1
                    });
                }
            }else{
                if($("#publicContent").children("a.item").length>0){
                    return;
                }else{
                    _loadDataPage({
                        url:"/stone/get_kaibao_end",
                        tpl:ob.$publicTpl.html(),
                        $loadMore:$("#load-more-public"),
                        emptyTpl:ob.$nopublicTpl.html(),
                        $targetContainer:$("#publicContent"),
                        page:1
                    });
                }
            }
        })
    }

    function _loadDataPage(optional){
        if(optional.page+""=="1"){
            optional.$loadMore.hide();
        }
        $.ajax({
            dataType: "Json",
            url: optional.url,
            data: {page: optional.page},
            success: function (json) {
                var data = json.data;
                if (data && Array.isArray(data) && data.length) {
                    var tpl = optional.tpl;
                    Mustache.parse(tpl);
                    var render = Mustache.render(tpl, {"items": data});
                    $(render).insertBefore(optional.$loadMore);
                    optional.$loadMore.show();
                    optional.$loadMore.data("currpage", optional.page);
                    optional.$loadMore.text("加载更多...");
                } else {
                    if(parseInt(optional.page)==1){
                        var tpl = optional.emptyTpl;
                        var render = Mustache.render(tpl);
                        optional.$targetContainer.html(render);
                    }else{
                        optional.$loadMore.text("亲,已经没有宝石咯...");
                    }
                }
            }
        });
    }

    function _loadMore() {
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var documentHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight >= documentHeight) {
                //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作

                var targetTab=$("#footerBar").find("li.active2").data("target");
                if(targetTab=="proList"||targetTab=="public"){

                    var page, $loadMore, url, tpl;
                    var targetChildTab;
                    if(targetTab=="proList"){
                        targetChildTab = $("#proList-nav").find("li.active").attr("role");
                    }else if(targetTab=="public"){
                        targetChildTab = $("#public-nav").find("li.active").attr("role");
                    }
                    var target=targetTab+"-"+targetChildTab;
                    switch (target + "") {
                        case "proList-carryon":
                            $loadMore = $("#load-more-carryon");
                            url = "/stone/carryon_stone";
                            tpl = ob.$carryonTpl.html();
                            break;
                        case "proList-preview":
                            $loadMore = $("#load-more-preview");
                            url = "/stone/preview_stone";
                            tpl = ob.$previewTpl.html();
                            break;
                        case "proList-finish":
                            $loadMore = $("#load-more-finish");
                            url = "/stone/finish_stone";
                            tpl = ob.$finishTpl.html();
                            break;
                        case "public-forecast":
                            $loadMore = $("#load-more-forecast");
                            url = "/stone/get_kaibao_start";
                            tpl = ob.$forecastTpl.html();
                            break;
                        case "public-public":
                            $loadMore = $("#load-more-public");
                            url = "/stone/get_kaibao_end";
                            tpl = ob.$publicTpl.html();
                            break;
                        default :
                            return;
                    }
                    page = parseInt($loadMore.data("currpage")) + 1;

                    $loadMore.text("正在加载中...");
                    /*$.ajax({
                        dataType: "Json",
                        url: url,
                        data: {page: page},
                        success: function (json) {
                            var data = json.data;
                            if (data && Array.isArray(data) && data.length) {
                                Mustache.parse(tpl);
                                var render = Mustache.render(tpl, {"items": data});
                                $(render).insertBefore($loadMore);
                                $loadMore.data("currpage", page);
                                $loadMore.text("加载更多...");
                            } else {
                                $loadMore.text("亲,已经没有宝石咯...");
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert(textStatus);
                        }
                    });*/

                    _loadDataPage({
                        url:url,
                        tpl:tpl,
                        $loadMore:$loadMore,
                        emptyTpl:"",
                        $targetContainer:"",
                        page:page
                    });
                }

            }
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
            isClick=true;
            var $this = $(this);
            location.href = "#" + $this.data("target");
            var index = $this.parent().find("li").index(this);

            var $pane = $(".tab-content.js-content>.tab-pane");
            if (index == 3) {
                $("#forecastTab").trigger("click");
            }

            $pane.removeClass("active").eq(index).addClass("active");
            $this.siblings().removeClass("active2").end().addClass("active2");
        });

        /**
         * 定位到当前url路由对应的块
         */
        _location();
    }

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

});
