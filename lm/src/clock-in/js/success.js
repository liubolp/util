window.addEventListener('load', function () {
  $(function () {
    var success = {
      data: {},
      init () {
        this.attachEvent()
      },
      attachEvent () {
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
          success.methods.pay(amount)
        })
        // 打开铃铛对话框
        $('.header-box .notice').click(function () {
          $('.modal-lingdang').show()
        })
        // 收听早安播报
        $('.modal-lingdang .listen').click(function () {
          success.methods.listen()
          $('.modal-lingdang').hide()
        })
        // 复制早安语
        $('.btns').on('click', '.copy', function (e) {
          var lang = $('.text-box .text').text()
          var clipboard = new Clipboard('.btns .copy', {
            text: function () {
              return lang;
            }
          })
          clipboard.on('success', function (e) {
            $('.modal-copy').show()
          })
          clipboard.on('error', function (e) {
            weui.alert('复制失败，请手动复制')
          })
        }) // 生成邀请海报
          .on('click', '.generate', function (e) {
            $('.modal-invite').show()
            success.methods.generate()
          })
      },
      methods: {
        /**
         * 打赏支付
         * @param amount {Number} 支付金额
         */
        pay (amount) {
          // todo 支付逻辑
        },
        // 生成邀请海报
        generate () {
          // todo
        },
        // 马上收听早安播报
        listen () {
          // todo
        }
      }
    }
    success.init()
  })
})
