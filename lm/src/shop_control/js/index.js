$(function () {
  $('.lm__touch-select').on('click', 'li', function (e) {
    $(this).addClass('selected').siblings().removeClass('selected')
  })
  $('.toggle-bar').click(function (e) {
    $('.select-box').toggleClass('hide')
  })
})
