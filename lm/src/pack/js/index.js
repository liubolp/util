window.addEventListener('load', function () {
  $(function () {
    var pack = {
      data: {
        type: 'luck', // 红包类型 {luck:拼手气红包,normal:普通红包}
        total: 0, // 红包金额
        quantity: 1, // 红包个数
        message: '恭喜发财，大吉大利' // 留言信息
      },
      init () {
        this.attachEvent()
      },
      attachEvent () {
        // 切换红包类型
        $('.pack .toggle').click(function (e) {
          var luck = $(this).parent().prev()
          if (luck.hasClass('luck')) { // 当前是拼手气红包
            luck.removeClass('luck').find('span:first-child').text('单个金额')
            $(this).text('改为拼手气红包')
            pack.data.type = 'normal'
          } else {
            luck.addClass('luck').find('span:first-child').text('总金额')
            $(this).text('改为普通红包')
            pack.data.type = 'luck'
          }
        })
        // 塞进红包
        $('.pack .pay').click(function (e) {
          var total = $('.price input').val()
          var quantity = $('.quantity input').val()
          var message = $('.message input').val()
          if (total < 1) {
            pack.methods.alertMsg('金额必须大于一元')
            return
          }
          if (quantity * 0.1 > 1 || quantity < 1) {
            pack.methods.alertMsg('单个红包小于最小限制')
            return
          }
          message && (pack.data.message = message)
          pack.data.quantity = quantity
          pack.data.total = total
          pack.methods.pay()
        })
      },
      methods: {
        // 处理异常
        alertMsg (msg) {
          weui.alert(msg)
        },
        // 支付操作
        pay () {
          var data = pack.data
          console.log(data)
          // todo 根据数据处理后面逻辑
        }
      }
    }
    pack.init()
  })
})
