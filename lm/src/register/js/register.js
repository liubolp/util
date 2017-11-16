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
  // 电话号码开始输入
  var getCode = $('#getcode')
  $('[name=telephone]').on('input', function (e) {
    getCode.prop('disabled', false)
  })
    .on('blur', function (e) {
      if (!$(this).val()) {
        getCode.prop('disabled', true)
      }
    })
  // 获取验证码
  getCode.click(e => {
    var isTelephone = checkTelephone($('[name=telephone]').val())
    if (isTelephone) {
      // todo 调用发短信的借口
    } else {
      // todo 提示电话号码输入错误
    }
  })
  // 注册操作
  $('a.submit').click(function (e) {
    var telephone = $('[name=telephone]').val()
    var verification = $('[name=verification]').val()
    var password = $('[name=password]').val()
    var protocol = $('[type=checkbox]').prop('checked')
    if (telephone && verification && password && protocol) {
      // todo 向后台发请求
    } else {
      // todo 提示错误信息
    }
  })
  // 检查手机号码
  function checkTelephone (tel) {
    return /^\d{5,20}$/.test(tel.trim())
  }
  // 更新国家和区号
  function getParam () {
    var search = location.search
    if (search) {
      var list = search.slice(1).split('&')
      list.forEach(function (item) {
        if (item.split('=')[0] === 'name') {
          $('.area .flex').text(decodeURIComponent(item.split('=')[1]))
        } else if (item.split('=')[0] === 'code') {
          $('.auth .code').text('+' + item.split('=')[1])
        }
      })
    }
  }
  getParam()
})($)
