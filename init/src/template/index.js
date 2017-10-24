// import './css/template.less'
$(function () {
  // 模板选择
  $('.tpl__select').on('click', 'div', function (e) {
    var target = $(e.currentTarget);
    var modal = $('.modal-template');
    // if (target.hasClass('tpl__select-active') && !modal.hasClass('hide')){
    //   modal.addClass('hide');
    //   return
    // }
    // modal.removeClass('hide');
    $(e.currentTarget).siblings().removeClass('tpl__select-active')
      .find('i').removeClass('tpl-arrow-up').addClass('tpl-arrow-down')
      .end().end().addClass('tpl__select-active')
      .find('i').addClass('tpl-arrow-up').removeClass('tpl-arrow-down')
  });
  // 搜索框聚焦
  $('#search').focus(function (e) {
    $('.modal-template,.modal-category').addClass('hide');
    $('.tpl__header__toggle').addClass('hide').find('.icon').removeClass('up');
    $('.tpl__header__button .button').prev('img').addClass('hide').end().removeClass('hide')
  }).blur(function (e) {
    $('.tpl__header__button .button').prev('img').removeClass('hide').end().addClass('hide')
  });
  $('.modal-category').on('click', '.footer', function (e) {
    $('.modal-category').addClass('hide')
  })
});
