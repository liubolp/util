(function ($) {
  // 切换显示和隐藏密码
  $('.password .right').click(e => {
    var input = $('.password .pwd')
    var hide = $(e.currentTarget).hasClass('hided')
    if (hide) {
      $(e.currentTarget).removeClass('hided').html('&#xe627')
      input.attr('type', 'text')
    } else {
      $(e.currentTarget).addClass('hided').html('&#xe618')
      input.attr('type', 'password')
    }
  })
  // 登录操作
  $('a.login').click(function (e) {
    var telephone = $('[name=telephone]').val()
    var password = $('[name=password]').val()
    if (telephone && password) {
      // todo 发送请求
    }
  })
})($)
