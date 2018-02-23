window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
      app.methods.initScroll('.tab-container .tabs-box')
    },
    attachEvent () {
      // 切换功能入口
      $('.tabs').on('click', 'span', function (e) {
        $('.lists .buffer').hide()
        if (!$(this).hasClass('current')) {
          $('.lists').toggleClass('next')
        }
        $(this).addClass('current').siblings().removeClass('current')
      })
      // 左右滑动处理
      $('.lists').on('touchstart', function (e) {
        app.data.startX = e.originalEvent.changedTouches[0].screenX
        app.data.startY = e.originalEvent.changedTouches[0].screenY
      }).on('touchend', function (e) {
        app.data.distanceX = e.originalEvent.changedTouches[0].screenX - app.data.startX
        app.data.distanceY = e.originalEvent.changedTouches[0].screenY - app.data.startY
        if (Math.abs(app.data.distanceY) > Math.abs(app.data.distanceX)) { // 判断左右滑条件
          return
        }
        var target = $(e.delegateTarget)
        var isAdvance = target.hasClass('next')
        if (app.data.distanceX < -20 && !isAdvance) { // 向左滑动
          $('.lists .buffer').hide()
          target.addClass('next')
          $('.tabs-box').find('span.current').removeClass('current').siblings().addClass('current')
        } else if (app.data.distanceX > 20 && isAdvance) { // 向右滑动
          target.removeClass('next')
          $('.tabs-box').find('span.current').removeClass('current').siblings().addClass('current')
        }
      })
    },
    methods: {
      // 滚动处理 start
      /**
       * 初始化滚动
       * @param selector { String } css选择器
       */
      initScroll (selector) {
        app.data.container = $(window)
        app.data.target = $(selector)
        app.data.top = app.data.target.position().top
        app.data.container.on('scroll', function (e) {
          requestAnimationFrame(app.methods.calcPosition)
        })
      },
      calcPosition () {
        var _top = app.data.container.scrollTop()
        if (_top >= app.data.top) {
          app.data.target.addClass('fixed')
        } else {
          app.data.target.removeClass('fixed')
        }
      }
      // 滚动处理 end
    }
  }
  app.init()
})
