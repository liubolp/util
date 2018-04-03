window.addEventListener('load', function () {
  $(function () {
    // 启动banner轮播
    new Swiper('.swiper-container', {
      autoplay: {
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination'
      },
      loop: true
    })
    // 处理打卡状态
    var hour = new Date().getHours(),
      start = 9,
      end = 12,
      timer,
      status
    // 处理打卡入口的状态
    checkStatus()
    function handleStatus () {
      if (hour < start) { // 如果打卡还未开始
        $('.clock.waiting').removeClass('hide').siblings().filter('.clock').addClass('hide')
      } else if (hour >= start && hour < end) { // 如果处在打卡时间段
        // todo 检查用户打卡状态
        status = false
        if (status) { // 如果已经打卡
          $('.clock.complete').removeClass('hide').siblings().filter('.clock').addClass('hide')
        } else { // 如果还未打卡
          $('.clock.active').removeClass('hide').siblings().filter('.clock').addClass('hide')
        }
        var current = new Date(),
          endTime = new Date(current.toLocaleDateString() + ' ' + end + ':00:00')
        timer = setInterval(function () {
          var distance = endTime - new Date()
          if (distance <= 0) {
            clearInterval(timer)
            checkStatus()
            return
          }
          calcTime(endTime - new Date())
        }, 1000)
      } else { // 否则已经过打卡时间
        if (status) { // 如果用户打过卡
          $('.clock.complete').removeClass('hide').siblings().filter('.clock').addClass('hide')
        } else { // 如果用户没有打过卡
          $('.clock.expired').removeClass('hide').siblings().filter('.clock').addClass('hide')
        }
      }
    }
    // 计算倒计时
    function calcTime (distance) {
      var s = distance / 1000
      var hour = Math.floor(s / 3600)
      var minute = Math.floor(s % 3600 / 60)
      var second = Math.floor(s % 3600 % 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      $('.clock.active .time').text(hour + ':' + minute + ':' + second)
    }
    // 检查用户打卡状态
    function checkStatus () {
      // todo 真实情况需要异步查询用户打卡状态
      /*$.ajax({
        url: '',
        type: 'get',
        dataType: 'json',
        success: function (res) {
          status = res
          handleStatus()
          // todo
        }
      })*/
      status = false
      handleStatus()
    }
    // 打卡操作
    $('.clock.active').click(function () {
      // todo 用户打卡操作
      $('.modal-success').fadeIn('fast')
    })
    // 打赏和点赞操作
    $('ul.list').on('click', '.reward', function (e) { // 打赏操作
      $('.modal-reward').fadeIn('fast')
    }).on('click', '.star-box', function (e) { // 点赞操作
      var num = $(this).find('.count').text()
      // 只能点一次赞
      $(this).toggleClass('disabled')
      if($(this).hasClass('disabled')) {// 如果用户添加一个赞
        // todo 插入数据库
        $(this).find('.count').text(+num + 1)
        $(this).find('.star').addClass('more')
      } else { // 用户取消点赞
        // todo 更新数据库
        $(this).find('.count').text(num - 1)
        if (num <= 1) {
          $(this).find('.star').removeClass('more')
        }
      }
    }).on('click', '.remind', function (e) { // 提醒好友打卡
      // todo 提醒好友打卡
      weui.alert('提醒好友成功')
      console.log($(this))
    })
    // 打赏选择操作
    $('.modal-reward').on('click', 'li', function (e) {
      $(this).addClass('selected').siblings().removeClass('selected')
    }).on('click', function (e) {
      if ($(e.target).hasClass('modal-reward')) {
        $(this).fadeOut('fast')
      }
      if ($(e.target).hasClass('pay')) {
        // todo 用户打赏支付
        var amount = $('.modal-reward li.selected')
        if(amount.length) {
          amount = amount.text().replace('元', '')
        } else {
          amount = $('.amount').val()
        }
        if (!amount) {
          weui.alert('请选择一个金额')
        } else {
          $(this).fadeOut('fast')
        }
      }
    })
    // 关闭打卡成功的提示框
    $('.modal-success').on('click', '.close', function (e) {
      $('.modal-success').fadeOut('fast')
    })
    // 排名列表切换
    $('ul.tab').on('click', 'li', function (e) {
      $(this).addClass('current').siblings().removeClass('current')
      // todo 更新排名列表
    })
  })
})
