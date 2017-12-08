window.addEventListener('load', function () {
  $(function () {
    // 添加删除事件
    $('.video-list').on('click', '.delete', function (e) {
      // todo 获取到存储在DOM结构中的数据
      var title = $(this).parent().parent().prev().find('h4').text()
      weui.confirm(`你确定都要删除[${title}]这个视频吗？`, confirm, cancel, {
        title: '删除视频'
      })
    })
    // 确认删除
    function confirm () {
      console.log('confirm')
      // todo 发请求到后台删除数据
    }
    // 取消删除
    function cancel () {
      console.log('cancel')
    }
  })
})
