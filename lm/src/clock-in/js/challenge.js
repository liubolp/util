window.addEventListener('load', function () {
  $(function () {
    function scrollPage () {
      // 处理翻页
      var data = {
        startY: 0,
        endY: 0,
        limit: 50, // 滑动阈值
        distance: 0,
        disabled: false, // 超过阈值后禁用处理
        isEnd: false,
        isDown: false // 下滑锁定状态
      }
      $('.full-container').on('touchstart', function (e) {
        data.isDown = $(this).hasClass('record')
        data.disabled = false
        data.isEnd = false
        data.startY = e.originalEvent.changedTouches[0].screenY
      }).on('touchmove', function (e) {
        if (data.disabled) { return }
        data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
        requestAnimationFrame(handleScroll)
      }).on('touchend', function (e) {
        data.isEnd = true
        data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
        requestAnimationFrame(handleScroll)
      })
      // 处理滑动
      function handleScroll () {
        if (data.distance > 0) { // 下滑
          if (data.isDown) { // 只在第二张页面调用下滑
            var list = $('.record .list').scrollTop()
            if (list > 0) { return } // 如果列表有滑动
            if (Math.abs(data.distance) >= data.limit) { // 超过阈值
              data.disabled = true
              data.distance = 0
            } else { // 没有超过阈值
              if (data.isEnd) {
                data.distance = window.innerHeight * -1
              } else {
                data.distance = Math.abs(data.distance - window.innerHeight) * -1
              }
            }
            $('#container').css({
              transform: 'translateY(' + data.distance + 'px)'
            })
          }
        } else if (Math.abs(data.distance) >= data.limit) { // 上滑
          if (data.isDown) { return } // 只在第一张页面调用上滑
          data.disabled = true
          $('#container').css({
            transform: 'translateY(-' + window.innerHeight + 'px)'
          })
        } else {
          if (data.isDown) { return }
          if (data.isEnd) {
            data.distance = 0
          }
          $('#container').css({
            transform: 'translateY(' + data.distance + 'px)'
          })
        }
      }
    }
    scrollPage()
    // 参加挑战打卡
    $('.join').click(function (e) {
      if ($(this).hasClass('paid')) { // 用户已付款
        // todo 调用打卡逻辑
        var hours = new Date().getHours()
        if (hours < 6 || hours >= 9) { // 不在打卡时间内
          $('.modal-tips').slideDown()
          setTimeout(function () { // 3S之后关闭提示框
            $('.modal-tips').slideUp()
          }, 3000)
        } else {
          // todo 打卡成功提示框
          $('.modal-success').fadeIn()
        }
      } else {
        // 调用支付
        $('.modal-pay').slideDown()
      }
    })
    // 关闭支付弹窗
    $('.modal-pay').click(function (e) {
      var target = $(e.target)
      if (target.hasClass('close') || target.hasClass('modal-pay')) {
        $('.modal-pay').fadeOut()
      }
    })
    // 关闭打卡成功提示框
    $('.modal-success').click(function (e) {
      var target = $(e.target)
      if (target.hasClass('close') || target.hasClass('modal-success')) {
        $('.modal-success').fadeOut()
      }
    })
  })
})
