window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 标签切换
      $('.tab').on('click', 'li', function (e) {
        $(this).addClass('current').siblings().removeClass('current')
      })
    },
    methods: {
    }
  }
  app.init()
})
