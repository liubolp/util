window.addEventListener('load', function () {
  $(function () {
    // 搜索逻辑
    $('.search-content').on('focus', function (e) {
      $(this).next().removeClass('hide')
    })
    $('.search-bar').on('click', '.search,.close', function (e) {
      if ($(this).hasClass('search')) {
        $('.close').addClass('hide')
        var value = $('[name=content]').val()
        // todo 根据输入内容进行搜索
      } else {
        $('[name=content]').val('').trigger('focus')
      }
    })
    // 筛选信息
    $('.filter-bal').on('click', '.filter-item', function (e) {
      // 获取点击元素的位置信息
      var client = this.getBoundingClientRect()
      $(this).find('.filter-content').css({top: client.top + client.height + 'px'})
      var arrow = $(this).children().first()
      if (arrow.hasClass('down') || ($(this).hasClass('area') && !$(this).hasClass('selected'))) {
        $('.filter-content').addClass('hide')
        $(this).siblings().removeClass('selected')
          .children().filter('.iconfont').addClass('down').html('&#xe609').end().end()
          .end().addClass('selected')
          .find('.filter-content').removeClass('hide')
        arrow.removeClass('down').html('&#xe60c')
        if ($(this).hasClass('area')) {
          // TODO 调用weui城市选择
          console.log('weui')
        }
      } else if ($(this).hasClass('selected')) { // 如果点击的是已选择自己就进行切换操作
        $(this).removeClass('selected')
          .find('.filter-content').addClass('hide')
        arrow.addClass('down').html('&#xe609')
      }
    }).on('touchmove', function (e) {
      $('.filter-content').addClass('hide')
      $('.filter-item.selected').removeClass('selected')
        .children().filter('.iconfont').addClass('down').html('&#xe609')
    })
    // 分类删选
    $('.first,.second,.gender,.supply,.auth').on('click', 'li', function (e) {
      e.stopPropagation()
      $(this).siblings().removeClass('selected')
        .end().addClass('selected')
    })
    // 导航操作
    $('.nav-bar').on('click', 'li', function (e) {
      $(this).siblings().removeClass('selected')
        .end().addClass('selected')
    })
  })
})
