window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
      this.methods.handleScroll()
    },
    attachEvent () {
      // 快速定位
      $('.nav-bar').on('click', 'a', function (e) {
        $(e.delegateTarget).find('.current').removeClass('current')
        $(this).addClass('current')
      })
      $('.sm-list')
        .on('click', 'button.wechat', function (e) { // 添加微信好友
          weui.dialog({
            title: '微信二维码',
            content: '<div><img src="../home/images/vip.png" style="width: 3rem;height: 3rem"></div>',
            className: 'wechat-qr',
            buttons: [{
              label: '取消',
              type: 'default'
            }]
          })
        })
        .on('click', 'button.delete', function (e) { // 删除
          weui.alert('删除')
        })
    },
    methods: {
      /**
       * 处理滚动
       */
      handleScroll () {
        var data = {
          startY: 0,
          distance: 0
        }
        $('.all-cards').on('touchstart', function (e) {
          data.startY = e.originalEvent.changedTouches[0].screenY
        }).on('touchmove', function (e) {
          data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
        }).on('scroll', function (e) {
          requestAnimationFrame(calcPosition)
        })
        function calcPosition () {
          var target, // 将要移动到的目标
            buffer, // 是否有可以移动的目标
            offset, // 移动目标的实时位置
            current = $('.nav-bar a.current') // 当前显示的目标
          if (data.distance > 0) { // 向下滑
            buffer = current.parent().prev()
            target = buffer.length && buffer
            offset = target ? $('#lm-' + target.text()).offset().top : 0
            if (offset >= 100) {
              target.siblings().find('.current').removeClass('current')
              target.find('a').addClass('current')
            }
          } else { // 向上滑
            buffer = current.parent().next()
            target = buffer.length && buffer
            offset = target ? $('#lm-' + target.text()).offset().top : 0
            if (offset < 100 && offset) {
              target.siblings().find('.current').removeClass('current')
              target.find('a').addClass('current')
            }
          }
        }
      }
    }
  }
  app.init()
})
