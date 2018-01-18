window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 提交和清空数据
      $('.btns').on('click', 'button', function (e) {
        var target = $('.content textarea')
        if ($(this).hasClass('submit')) {
          app.methods.submit(target.val())
        } else {
          target.val('')
        }
      })
    },
    methods: {
      /**
       * 提交文章抓取地址
       * @param src { String } 文章源地址
       */
      submit (src) {
        if (!src) {
          weui.alert('地址为空，不能提交')
          return
        }
        console.log(src)
        // todo
      }
    }
  }
  app.init()
})
