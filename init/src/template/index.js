// import './css/template.less'
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
});
