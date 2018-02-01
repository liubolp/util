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
        if (!$(this).hasClass('current')) {
          $('.lists').toggleClass('next')
        }
        $(this).addClass('current').siblings().removeClass('current')
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
