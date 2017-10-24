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
  // 搜索框聚焦
  /*$('#search').focus(function (e) {
    $('.modal-template,.modal-category').addClass('hide');
    $('.tpl__header__toggle').addClass('hide').find('.icon').removeClass('up');
    $('.tpl__header__button .button').prev('img').addClass('hide').end().removeClass('hide')
  }).blur(function (e) {
    $('.tpl__header__button .button').prev('img').removeClass('hide').end().addClass('hide')
  });
  $('.modal-category').on('click', '.footer', function (e) {
    $('.modal-category').addClass('hide')
  })*/
});
