window.addEventListener('load', function () {
  $(function () {
    // 为每个名片更新背景图片
    $('.box').each(function (e) {
      var url = $(this).attr('data-img')
      $(this).css({'background-image': 'url(' + url + ')'})
    })
    // 名片选择和添加
    var selected
    $('.card-list').on('click', 'li', function (e) {
      if ($(this).hasClass('add')) {
        $('a.modify').attr('href', 'javascript:;')
          .removeClass('active')
        selected = null
        // todo 跳转到添加页面
      } else {
        $(this).addClass('selected')
          .siblings().removeClass('selected')
        // todo 获取当前选中名片的关键信息，用于跳转到修改页面的参数
        selected = $(this).attr('data-something')
        // todo 将获取的参数放置在a.modify中用于跳转
        var href = '#'
        $('a.modify').attr('href', href)
          .addClass('active')
      }
    }).on('click', '.view button', function (e) { // 切换正在使用的名片
      $('.view .current').removeClass('current')
      $(this).addClass('current')
      var target = $(this).parent().parent() // li>.box
      // todo 将当前选中的信息更新到后台
    })
    // 设为默认背景
    $('button.default').click(function (e) {
      e.preventDefault()
      $(this).parent().css({'background-image': 'none'})
      //  todo 发请求到后台更新数据
    })
    // 修改名片
    $('a.modify').click(function (e) {
      if (!selected) { // 如果没有选择任何名片
        e.preventDefault()
        weui.alert('请选择一个名片后再试')
      }
    })
    // 删除名片
    $('a.delete').click(function (e) {
      var target = $('.card-list li.selected')
      // todo 获取目标元素中的必要信息然后调用删除
      if (!target) { // 如果要获取的信息不存存在
        weui.alert('请选择一个名片')
        return
      }
      weui.confirm(`你确定都要删除这个名片吗？`, confirm, cancel, {
        title: '删除名片'
      })
      // 确认删除
      function confirm () {
        // todo something
      }
      // 取消删除
      function cancel () {
        // todo something
      }
    })
    // 搜索位置处理
    $('.input-box input').blur(function (e) {
      if ($(this).val()) {
        $(this).parent().addClass('fixed')
      } else {
        $(this).parent().removeClass('fixed')
      }
    })
    // 手动搜索处理
    $('.input-box .search').click(function (e) {
      var val = $(this).prev().val()
      if (val) {
        // todo 进行搜索操作
        console.log(val)
      }
    })
  })
})
