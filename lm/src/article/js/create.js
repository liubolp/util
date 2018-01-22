window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      startY: 0,
      distance: 0
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 标签切换
      $('.tab').on('click', 'li', function (e) {
        $(this).addClass('current').siblings().removeClass('current')
      })
      // 滑动隐藏部分
      $(window).on('touchstart', function (e) {
        app.data.startY = e.originalEvent.changedTouches[0].screenY
      }).on('touchmove', function (e) {
        app.data.distance = e.originalEvent.changedTouches[0].screenY - app.data.startY
        requestAnimationFrame(app.methods.handleScroll)
      }).on('scroll', function (e) {
        requestAnimationFrame(app.methods.handleTop)
      })
    },
    methods: {
      // 滚动处理 end
      handleScroll () {
        if (app.data.distance > 0) { // 下滑
          $('.input-box,.tab').show()
        } else { // 上滑
          $('.input-box,.tab').hide()
        }
      },
      // 处理顶部问题
      handleTop () {
        var top = $(window).scrollTop()
        if (top <= 0) {
          $('.input-box,.tab').show()
        }
      }
    }
  }
  app.init()
})
