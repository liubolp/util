window.addEventListener('load', function () {
  var app = {
    data: {
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 浮沉导航操作
      $('.nav-box').on('click', '.toggle,.mask', function (e) {
        var modal = $('.modal-nav')
        if ($(this).hasClass('mask') || modal.hasClass('show')) { // 关闭弹框
          modal.removeClass('show')
          setTimeout(function () {
            modal.hide()
          }, 200)
          return
        }
        modal.show(16, function () {
          modal.addClass('show')
        })
      })
    },
    methods: {
    }
  }
  app.init()
})
