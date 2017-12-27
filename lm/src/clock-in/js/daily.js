window.addEventListener('load', function () {
  $(function () {
    var daily = {
      data: {},
      init () {
        this.attachEvent()
      },
      attachEvent () {
        // 播放暂停切换
        $('.audio-box').on('click', '.toggle', function (e) {
          $(this).toggleClass('pause')
          var audio = $('#audio')[0]
          if ($(this).hasClass('pause')) {
            audio.play()
          } else {
            audio.pause()
          }
        })
        // 给留言点赞
        $('.list').on('click', '.zan>span', function (e) {
          var type
          if ($(this).hasClass('agree')) { // 取消点赞
            $(this).removeClass('agree')
            type = 'remove'
          } else { // 添加点赞
            $(this).addClass('agree')
            type = 'add'
          }
          daily.methods.agreeMessage($(this).parents('li'), type)
        })
        // 打开打赏对话框
        $('.animate-box').click(function (e) {
          $('.modal-reward').show()
        })
        // 关闭和打赏操作
        $('.modal-reward').on('click', '.close', function (e) { // 关闭
          $('.modal-reward').hide()
        }).on('click', 'li', function (e) { // 切换金额
          $(this).addClass('selected').siblings().removeClass('selected')
          $('.amount input').val('')
        }).on('click', '.pay', function (e) { // 支付操作
          var amount = $('.amount input').val()
          amount = amount > 0 ? amount : parseFloat($('.modal-reward li.selected').text())
          $('.modal-reward').hide()
          daily.methods.pay(amount)
        })
      },
      methods: {
        /**
         * 留言点赞操作
         * @param target { Object } 当前点击留言信息的li标签Jquery对象
         * @param type { String } [remove] 取消点赞；[add] 添加点赞
         */
        agreeMessage (target, type) {
          // todo 可以从target中获取有用的信息
          if (type === 'add') {
            // todo
          } else if (type === 'remove') {
            // todo
          }
        },
        /**
         * 支付操作
         * @param amount { Number } 支付金额
         */
        pay (amount) {
          // todo 支付逻辑
          console.log(amount)
        }
      }
    }
    daily.init()
  })
})
