window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 切换功能入口
      $('.tabs').on('click', 'span', function (e) {
        var target = $(this).attr('data-target'),
          old = $(this).siblings().attr('data-target')
        $(this).addClass('current').siblings().removeClass('current')
        app.methods.toggle($('#' + target), $('#' + old))
      })
    },
    methods: {
      toggle (target, old) {
        old.hide()
        target.show()
      }
    }
  }
  app.init()
})
