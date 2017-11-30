window.addEventListener('load', function (e) {
  $(function () {
    $('#nav-bar').on('click', 'li', function (e) {
      var subList = $('#category-list')
      $(this).addClass('current').siblings().removeClass('current')
      if ($(this).hasClass('poster')) {
        subList.slideToggle()
        return
      }
      subList.fadeOut()
    })
    $('#category-list').on('click', 'li', function (e) {
      $(this).addClass('current').siblings().removeClass('current')
      // todo 动态获取对应子类的数据并更新页面
    })
  })
})
