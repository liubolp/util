$(function () {
  // 模板选择
  $('.tpl__select').on('click', 'div', function (e) {
    var target = $(e.currentTarget);
    var modal = $('.modal-template');
    if (target.hasClass('tpl__select-active') && !modal.hasClass('hide')){
      modal.addClass('hide');
      return
    }
    target.hasClass('open-modal') ? (modal.removeClass('hide')) : (modal.addClass('hide'));
    $(e.currentTarget).siblings().removeClass('tpl__select-active')
      .end().addClass('tpl__select-active')
  });
  // 快速定位
  $('.nav-bar').on('click', 'a', function (e) {
    $('a.current').removeClass('current')
    $(this).addClass('current')
  })
  // 处理滑动定位
  var data = {
    startY: 0,
    distance: 0
  }
  $('.modal-template .container').on('touchstart', function (e) {
    data.startY = e.originalEvent.changedTouches[0].screenY
  }).on('touchmove', function (e) {
    data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
  }).on('scroll', function (e) {
    requestAnimationFrame(calcPosition)
  })
  function calcPosition () {
    var target, // 将要移动到的目标
      buffer, // 是否有可以移动的目标
      offset, // 移动目标的实时位置
      current = $('.nav-bar a.current') // 当前显示的目标
    if (data.distance > 0) { // 向下滑
      buffer = current.parent().prev()
      target = buffer.length && buffer
      offset = target ? $('#lm-' + target.text()).offset().top : 0
      if (offset >= 80) {
        target.siblings().find('.current').removeClass('current')
        target.find('a').addClass('current')
      }
    } else { // 向上滑
      buffer = current.parent().next()
      target = buffer.length && buffer
      offset = target ? $('#lm-' + target.text()).offset().top : 0
      if (offset < 80) {
        target.siblings().find('.current').removeClass('current')
        target.find('a').addClass('current')
      }
    }
  }
});
