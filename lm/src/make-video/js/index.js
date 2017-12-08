window.addEventListener('load', function () {
  $(function () {
    // 下一步事件
    $('button.save').click(function (e) {
      var src = $('[name=src]').val()
      // todo 校验地址后进行页面跳转
      console.log(src)
    })
  })
})
