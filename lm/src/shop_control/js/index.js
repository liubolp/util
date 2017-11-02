(($) => {
  $(function () {
    $('.lm__touch-select').on('click', 'li', function (e) {
      $(this).addClass('selected').siblings().removeClass('selected')
    })
    $('.toggle-bar').click(function (e) {
      $('.select-box').toggleClass('hide')
    })
    // 模板选择
    $('.lm__list').on('click', '.container', function (e) {
      $('.lm__list .container').removeClass('selected')
      $(e.currentTarget).addClass('selected')
      $('footer.footer').removeClass('hide')
    })
    // 点击编辑和关注按钮时阻止冒泡
    $('.item-hot').on('click', function (e) {
      e.stopPropagation()
    })
    // 保存和取消事件
    $('footer.footer').click(function (e) {
      $(this).addClass('hide')
      $('.lm__list .container').removeClass('selected')
      if ($(e.target).hasClass('cancel')) {
        // 如果是取消
      } else {
        // 如果是保存
      }
    })
  })
})($)
