window.addEventListener('load', function () {
  $(function () {
    // 提交事件
    $('.submit').click(function (e) {
      var url = $('#content').val()
      if (url) {
        // todo 将内容提交到指定位置
      } else {
        weui.alert('请输入推荐文章链接')
      }
    })
    // 查看推荐记录
    $('.record').click(function (e) {
      e.preventDefault()
      // todo 到后台查询是否有推荐记录
      var result // 后台返回的的值
      if (result) { // 如果有记录
        // 页面跳转到记录页
        location.href = location.href + 'recommend.html'
      } else {
        $('.modal-nothing').fadeIn()
      }
    })
    // 关闭提示框
    $('.modal-nothing').on('click', '.close', function (e) {
      $('.modal-nothing').fadeOut()
    })
  })
})
