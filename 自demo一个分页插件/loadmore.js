//加载更多的私有通用方法
function _loadmore(opt) {
    //opt.$loadmore.on('click', function () {
    var $this = opt.$loadmore,
        page = parseInt($this.data('currpage')),
        maxpage;
    $.ajax({
        url: '/news/data',
        type: 'get',
        dataType: 'json',
        data: $.extend({page: page}, opt.data),
        beforeSend: function () {
            var mp=$this.data('maxpage')
            if(mp!==undefined&&parseInt(mp)<page){
                return false
            }
            $this.text('加载中...').attr('disabled', true)
        },
        success: function (json) {
            var zxdt = json.data,
                arry = [];
            $this.data('maxpage') === undefined && $this.data('maxpage', json.maxpage)
            maxpage = parseInt($this.data('maxpage'))

            //组织数据列表
            $.each(zxdt, function (index, item) {
                arry.push('<li class="clearfix"><a href="/news/detail/" class="block-a pull-left">' + item.title + '</a>' +
                    '<div class="pull-right">' + item.created_at + '</div>' +
                    '</li>')
            })

            if (page === 1) {//初始化加载第一页时
                opt.$list.html(arry.join(''))
            } else {
                opt.$list.append(arry.join(''))
            }

            $this.data('currpage', page + 1)

            $this.text('加载更多...')
            /*if (!maxpage || maxpage <= page) {
             $this.text('已没有了...').attr('disabled', true)
             }*/
        },
        error: function () {
            $this.text('请检查网络...')
        },
        complete: function () {
            $this.removeAttr('disabled')
            if (!maxpage || maxpage <= page) {
                $this.text('已没有了...').attr('disabled', true)
            }
        }
    })
    //})
}
