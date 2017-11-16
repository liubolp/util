window.addEventListener('load', function () {
  $(function () {
    // 处理搜索
    $('[name=keyword]').on('focus', function (e) {
      $(this).css({textAlign: 'left'})
    }).on('blur', function (e) {
      if (!$(this).val()) {
        $(this).css({textAlign: 'center'})
      }
    })
    $('.btn').click(function (e) {
      var val = $('[name=keyword]').val()
      if (val) {
        var list = $('.outer-list li')
        list.each(function (index, item) {
          if (!$(item).find(`.country:contains(${val})`).length) {
            $(item).hide()
          }
        })
      } else {
        $('.outer-list li').show()
      }
    })
    // 处理点击情况
    $('aside').on('click', 'li', function (e) {
      $(this).addClass('current').siblings().removeClass('current')
    })
    // 处理滑动定位
    var data = {
      startY: 0,
      distance: 0
    }
    $('.container').on('touchstart', function (e) {
      data.startY = e.originalEvent.changedTouches[0].screenY
    }).on('touchmove', function (e) {
      data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
    }).on('scroll', function (e) {
      requestAnimationFrame(calcPosition)
    })
    // 上滑过渡处理
    function upScroll (target) {
      if ($(target).parent().offset().top >= 55) {
        $('.aside li.current').removeClass('current').prev().addClass('current')
        $('[id].current').removeClass('current')
        $(target).parent().prev().find('[id^=search-]').addClass('current')
      }
    }
    // 下滑过渡处理
    function downScroll (target) {
      if ($(target).offset().top <= 55) {
        $('.aside li.current').removeClass('current').next().addClass('current')
        $('[id].current').removeClass('current')
        $(target).addClass('current')
      }
    }
    function calcPosition () {
      if (data.distance > 0) { // 向下滑
        var current = $('.aside li.current')
        if (current.prev().length) {
          upScroll(`#search-${current.text()}`)
        }
      } else { // 向上滑
        // 如果可以向下滑
        var next = $('.aside li.current').next()
        if (next.length) {
          downScroll(`#search-${next.text()}`)
        }
      }
    }
    // 更新选择国家后的回调地址
    function getParam () {
      var search = location.search
      if (search) {
        var list = search.slice(1).split('&')
        list.forEach(function (item) {
          if (item.split('=')[0] === 'origin') {
            $('.inner-list a').each(function (i, a) {
              var href = $(this).attr('href')
              var direct = href.replace(/^\/register/, '/' + item.split('=')[1])
              $(this).attr('href', direct)
            })
          }
        })
      }
    }
    getParam()
  })
})
