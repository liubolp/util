window.addEventListener('load', function () {
  $(function () {
    // 单页滚动
    function scrollPage () {
      // 处理翻页
      var data = {
        startY: 0,
        endY: 0,
        limit: 50, // 滑动阈值
        distance: 0,
        disabled: false, // 超过阈值后禁用处理
        isEnd: false,
        isDown: false, // 下滑锁定状态
        target: null // 当前触摸的元素
      }
      $('.full-container').on('touchstart', function (e) {
        data.isDown = $(this).hasClass('expand')
        data.disabled = false
        data.isEnd = false
        data.startY = e.originalEvent.changedTouches[0].screenY
        data.target = $(e.originalEvent.target)
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
            if (Math.abs(data.distance) >= data.limit) { // 超过阈值
              if (data.isEnd) { return } // 如果是触摸结束直接退出
              data.disabled = true
              data.distance = 0
              $('.toggle').trigger('click') // 下滑开启音乐
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
        } else { // 上滑
          if (data.isDown) { return } // 只在第一张页面调用上滑
          // 如果存在局部可滑动区域
          if (data.target.hasClass('exclude') && data.target.scrollTop() + data.target.height() < data.target[0].scrollHeight) { return }
          if (Math.abs(data.distance) >= data.limit) { // 超过阈值
            if (data.isEnd) { return } // 如果是触摸结束直接退出
            data.disabled = true
            data.distance = window.innerHeight * -1
            var toggle = $('.toggle')
            if (toggle.hasClass('pause')) { // 是播放状态,上滑关闭音乐
              toggle.trigger('click')
            }
          } else {
            if (data.isEnd) { // 如果触摸取消都没有达到阈值
              data.distance = 0
            }
          }
          $('#container').css({
            transform: 'translateY(' + data.distance + 'px)'
          })
        }
      }
    }
    scrollPage()
    // 查看大图效果
    $('.img-box').on('click', 'button', function (e) {
      $('.modal-img').slideDown()
    })
    $('.modal-img .close').click(function (e) {
      $('.modal-img').fadeOut()
    })
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
  })
})
