/**
 * Created by xiaolijun on 2015/11/9.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    require("bootstrap");
    var $card = $(".bankcard-item");
    var timeout;
    var bankid;
    var $currCard;
    var ob = {
        $sure: $("#sure"),
        $cancel: $("#cancel"),
        $alertModal:$("#alertModal")
    }
    module.exports = {

        init: function () {
            _init();
            _delCard();
            _alert();
        }
    }

    function _init(){
        $card.length>=3&&$("#add").css("background-color","#f2f2f2").attr("href","javascript:;");
    }

    function _delCard() {
        $card.on("touchstart mousedown", function (e) {
            var $this=$(this);
            timeout = setTimeout(function () {
                bankid=$this.data("id");
                $currCard=$this;
                ob.$alertModal.modal("show");
            }, 2000);
            e.preventDefault();
        });

        $card.on("touchend mouseup", function (e) {
            clearTimeout(timeout);
            e.preventDefault();
        });
    }

    /**
     * 提示弹窗下的操作
     */
    function _alert(){
        ob.$sure.on("click", function () {
            $.post('/card/delete', {id:bankid}, function (data, status) {
                if (status) {
                    ob.$alertModal.modal("hide");
                    $currCard.hide(1000, function () {
                        $(this).remove();
                    });
                }
            });
        });

        ob.$cancel.on("click", function () {
            ob.$alertModal.modal("hide");
        });
    }


});
