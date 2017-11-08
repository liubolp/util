window.addEventListener('load', function () {
  $(function () {
    // tab切换操作
    $('.nav-bar').on('click', 'li', function (e) {
      var target = $(this)
      $(this).addClass('selected').siblings().removeClass('selected')
      if (target.hasClass('filter-btn')) { // 筛选操作
        $('.filter-box').toggle().removeClass('hide')
        return 0
      } else if (target.hasClass('direct')) { // 直接会员
        // todo 拿到直接会员信息渲染列表
        $('.customer-detials').removeClass('ally').html('替他制作')
        $('.filter-box').hide()
        return 0
      } else if (target.hasClass('indirect')) { // 间接会员
        // todo 拿到间接会员信息渲染列表
        $('.customer-detials').removeClass('ally').html('替他制作')
        $('.filter-box').hide()
      }
    })
    // 处理筛选条件
    // 选择日期
    $('.date-box').on('click', '.date-start,.date-end', function (e) {
      var target = $(this)
      weui.datePicker({
        start: 2000,
        end: new Date(),
        defaultValue: new Date().toLocaleDateString().split('/'),
        onConfirm: function (result) {
          result = `${result[0]}年${result[1]}月${result[2]}日`
          target.find('input').val(result)
        },
        id: 'datePicker'
      })
    })
    // 选择等级
    $('.level-list').on('click', 'li', function (e) {
      $(this).toggleClass('selected')
    })
    // 筛选结果处理
    $('.result').on('click', 'a', function (e) {
      if ($(this).hasClass('confirm')) {
        var start_time = $('[name=date-start]').val()
        var end_time = $('[name=date-end]').val()
        var levels = []
        $.each($('.level-list li.selected'), function (i, item) {
          levels.push($(item).text().trim())
        })
        // todo 筛选处理
      }
      $('.filter-box').toggle()
    })
    /* 搜索处理 */
    $('.search-content').on('input', function (e) {
      $(this).next().removeClass('hide')
    })
    $('.iconfont.close').click(function () {
      $(this).addClass('hide').prev().val('').trigger('focus')
    })
    // 搜索按钮
    $('.iconfont.search').click(function () {
      var value = $('.search-content').val()
      $('.iconfont.close').addClass('hide')
      // todo 根据输入内容进行搜索
    })
  })
})
