+function ($) {
    'use strict';

    // hxnumber CLASS DEFINITION
    // ======================

    var HxNumber = function (el, options) {
        this.$el=$(el)
        this.$minus = $(el).find('.js-minus')
        this.$plus = $(el).find('.js-plus')
        this.$input = $(el).find('.js-input')
        this.options = $.extend({}, HxNumber.DEFAULTS, options)
        this.remaind = this.options.max
        $(el).on('click', '.js-plus', $.proxy(this.plus, this))
        $(el).on('click', '.js-minus', $.proxy(this.minus, this))
        $(el).on('keyup', '.js-input', $.proxy(this.input, this))
        $(el).on('blur', '.js-input', $.proxy(this.blur, this))

        this.refresh()
    }

    HxNumber.VERSION = '1.0.0'

    HxNumber.DEFAULTS = {
        max:10
    }

    HxNumber.prototype.plus = function (e) {
        var that = this
        if (!that.refresh())return

        var num = parseInt(that.$input.val()) + 1;
        that.$minus.removeAttr("disabled");
        if (num >= that.remaind) {
            that.$plus.prop("disabled", true);
        }
        that.$input.val(num);
        that.$el.trigger('end.hx.number',num)
        e.preventDefault();
    }

    HxNumber.prototype.minus = function (e) {
        var that = this
        if (!that.refresh())return

        var num = parseInt(that.$input.val()) - 1;
        that.$plus.removeAttr("disabled")
        if (num <= 1) {
            that.$minus.prop("disabled", true)
        }
        that.$input.val(num);
        that.$el.trigger('end.hx.number',num)
        e.preventDefault();
    }

    HxNumber.prototype.input = function () {
        var that = this,
            reg = new RegExp("^[1-9][0-9]*$"),
            value = that.$input.val();

        if (reg.test(value)) {
            if (value == 1) {
                that.$minus.prop("disabled", true);
                that.remaind <= 1 ? that.$plus.prop("disabled", true) :
                    that.$plus.removeAttr("disabled")
            } else if (value >= that.remaind) {
                that.$input.val(that.remaind);
                that.$minus.removeAttr("disabled");
                that.$plus.prop("disabled", true);
            } else {
                that.$minus.removeAttr("disabled");
                that.$plus.removeAttr("disabled");
            }
        } else {
            if (value != "") {
                that.$input.val(1);
                that.$minus.prop("disabled", true);
                if (that.remaind <= 1) {
                    that.$plus.prop("disabled", true);
                } else {
                    that.$plus.removeAttr("disabled");
                }
            }
        }
        that.$el.trigger('end.hx.number',that.$input.val())
    }

    HxNumber.prototype.blur = function () {
        var that = this
        if (that.$input.val() == "") {
            that.$input.val("1");
            that.$minus.prop("disabled", true);
            if (that.remaind <= 1) {
                that.$plus.prop("disabled", true);
            } else {
                that.$plus.removeAttr("disabled");
            }
        }
        that.$el.trigger('end.hx.number',num)
    }

    HxNumber.prototype.refresh = function () {
        var that = this,
            val = parseInt(that.$input.val())
        if (!val) {
            that.$input.val("1");
            that.$minus.prop("disabled", true);
            if (that.remaind <= 1) {
                that.$plus.prop("disabled", true);
            } else {
                that.$plus.removeAttr("disabled");
            }
            return false
        }
        that.$input.val(val)
        return true
    }

    // hxnumber PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('hx.number')
            var options = typeof option == 'object' && option

            if (!data) $this.data('hx.number', (data = new HxNumber(this, options)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.hxnumber

    $.fn.hxnumber = Plugin
    $.fn.hxnumber.Constructor = HxNumber


    // hxnumber NO CONFLICT
    // =================

    $.fn.hxnumber.noConflict = function () {
        $.fn.hxnumber = old
        return this
    }


    // ALERT DATA-API
    // ==============

    //$(document).on('click.hx.number.data-api', dismiss, HxNumber.prototype.close)
    $(window).on('load', function () {
        /*$('[data-number="hxnumber"]').each(function () {
         var $hxnumber = $(this)
         Plugin.call($hxnumber, $hxnumber.data())
         })*/
        var $hxnumber = $('[data-number="hxnumber"]')
        Plugin.call($hxnumber, $hxnumber.data())
    })

}(jQuery);