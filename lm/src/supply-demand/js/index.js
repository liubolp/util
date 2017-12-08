window.addEventListener('load', function () {
  $(function () {
    // 顶部类型切换事件
    var type = $('.title>.type')
    $('.tab').on('click', 'div', function (e) {
      $(this).addClass('current').siblings().removeClass('current')
      var text = $(this).hasClass('supply') ? '我的供应' : '我的需求'
      type.text(text)
      // todo 将供应和需求的标签重新渲染
    })
    // 编辑切换
    $('.title>.toggle').click(function (e) {
      var text = $(this).text() === '编辑' ? '完成' : '编辑'
      $(this).text(text)
      if (text === '完成') {
        $('.list').find('.close-box').addClass('show')
          .end().find('.add').addClass('disabled')
      } else {
        $('.list').find('.close-box').removeClass('show')
          .end().find('.add').removeClass('disabled')
      }
    })
    // 删除已有标签
    $('.list').on('click', '.close-box', function (e) {
      e.stopPropagation()
      $(this).parent().remove()
      // todo 将删除的标签传到后台更新数据库
      if (type.text() === '我的供应') {
        //
      } else if (type.text() === '我的需求') {
        //
      }
    })
      .on('click', 'li', function (e) { // 切换标签看详情描述
        if ($(this).hasClass('add')) { // 添加一个分类
          // todo 调用weui.picker 选择供需列表信息
          return
        }
        $(this).addClass('selected').siblings().removeClass('selected')
        // todo 将当前标签的详细信息获取后放到展示区域
        var desc = 'hello world!'
        $('#details').val(desc)
      })
    // 保存
    $('.save').click(function (e) {
      // todo 获取相应信息传到后台
      var label = $('.list>li.selected')
      var desc = $('#details').val()
      if (type.text() === '我的供应') {
        //
      } else if (type.text() === '我的需求') {
        //
      }
    })
  })
})
