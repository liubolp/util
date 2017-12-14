window.addEventListener('load', function () {
  $(function () {
    // 保存事件
    $('button.save').click(function (e) {
      var language = $('[name=language]:checked').val()
      console.log(language)
    })
  })
})
