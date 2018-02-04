window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 展开和收起名片
      $('.message-list').on('click', '.item-title', function (e) {
        $(this).toggleClass('collapse').next().slideToggle()
      })
    },
    methods: {}
  }
  app.init()
})
