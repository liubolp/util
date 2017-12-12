window.addEventListener('load', function () {
  $(function () {
    // 二维码切换添加事件
    $('header.tab').on('click', 'div', function (e) {
      var src = $(this).attr('data-src')
      $(this).addClass('current').siblings().removeClass('current')
      $('.qr-box .qr').attr('src', src)
    })
  })
})
