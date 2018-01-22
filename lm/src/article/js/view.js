window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
    },
    init () {
      this.attachEvent()
      app.methods.initScroll('#article .personal')
    },
    attachEvent () {
      // 音乐控制
      $('.music-box').click(function (e) {
        var audio = $('#audio')[0]
        if ($(this).hasClass('play')) {
          $(this).removeClass('play')
          audio.pause()
        } else {
          $(this).addClass('play')
          audio.play()
        }
      })
      // 打开打赏框
      $('#article').on('click', '.reward', function (e) {
        $('.modal-reward').fadeIn()
      })
      // 打赏框操作
      $('.modal-reward').on('click', '.close', function (e) { // 关闭
        $('.modal-reward').hide()
      }).on('click', 'li', function (e) { // 切换金额
        $(this).addClass('selected').siblings().removeClass('selected')
        $('.amount input').val('')
      }).on('click', '.pay', function (e) { // 支付操作
        var amount = $('.amount input').val()
        amount = amount > 0 ? amount : parseFloat($('.modal-reward li.selected').text())
        $('.modal-reward').hide()
        app.methods.reward(amount)
      })
      // 打开留言框
      $('.details .message').click(function (e) {
        $('.modal-message').fadeIn()
      })
      // 留言框操作
      $('.modal-message').on('click', '.mask,.close,.submit', function (e) {
        var target = $(e.delegateTarget)
        if ($(this).hasClass('submit')) {
          var name = target.find('[name=name]').val(),
            tel = target.find('[name=tel]').val(),
            message = target.find('[name=message]').val()
          app.methods.sendMessage({name, tel, message})
        }
        target.hide()
      })
      // 点赞操作
      $('.zan .article-icon').click(function (e) {
        var type = 'add', count = parseInt($(this).next().text())
        if ($(this).hasClass('agree')) {
          type = 'cancel'
          count = count > 0 ? (--count) : 0
          $(this).removeClass('agree').next().text(count)
        } else {
          type = 'add'
          $(this).addClass('agree').next().text(++count)
        }
        app.methods.updateAgree(type)
      })
    },
    methods: {
      /**
       * 打赏
       * @param amount { Number } 打赏金额
       */
      reward (amount) {
        console.log(amount)
        // todo
      },
      /**
       * 发送留言信息
       * @param info { Object } 用户输入的信息
       */
      sendMessage (info) {
        console.log(info)
        // todo
      },
      /**
       * 更新点赞操作
       * @param type { String } 'add'添加；'cancel'取消
       */
      updateAgree (type) {
        console.log(type)
      },
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
