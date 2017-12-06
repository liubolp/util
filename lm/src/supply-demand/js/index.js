window.addEventListener('load', function () {
  $(function () {
    // 顶部类型切换事件
    $('.tab').on('click', 'div', function (e) {
      $(this).addClass('current').siblings().removeClass('current')
      if ($(this).hasClass('supply')) { // 如果当前是供应列表
      
      }
    })
  })
})
