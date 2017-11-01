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
  // 获取验证码
  $('#getcode').click(e => {
    // todo 调用发短信的借口
    console.log(1)
  })
})($)
