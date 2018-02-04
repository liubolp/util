window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 展开和收起名片
      $('.industry-list').on('click', '.item-title', function (e) {
        $(this).find('.arrow').toggleClass('down')
          .end().next().slideToggle()
      })
    },
    methods: {}
  }
  app.init()
})
