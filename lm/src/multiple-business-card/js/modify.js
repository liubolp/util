window.addEventListener('load', function () {
  $(function () {
    // 返回操作
    $('.fixed-header .back').click(function (e) {
      history.go(-1)
    })
    // 保存操作
    $('.fixed-header .save').click(function (e) {
      var result =  {
        name: $('[name=name]').val(),
        gender: $('[name=gender]').prop('checked') ? '女' : '男',
        tel: $('[name=tel]').val(),
        wechat: $('[name=wechat]').val(),
        qq: $('[name=qq]').val(),
        email: $('[name=email]').val()
      }
      console.log(result)
      // TODO 将数据发送到后台
    })
  })
})
