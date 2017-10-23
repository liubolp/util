// import './css/template.less'
$(function () {
  // 自定义的下拉选择功能
  $('.custom-select').on('click', '.select-value', function (e) {
    $('.select-options-box').toggleClass('hide');
    $(e.currentTarget).toggleClass('collapse')
  }).on('click', '.select-option', function (e) {
      if($(e.currentTarget).hasClass('add')){
        return false
        // todo 跳转到对应的页面
      }else {
        $(e.currentTarget).siblings().removeClass('selected')
          .end().addClass('selected');
        $('.select-value').html($(e.currentTarget).find('span').html()).removeClass('collapse');
        $('.select-options-box').addClass('hide')
      }
    });
  // 打开和关闭类型选择
  $('.tpl__header__toggle').click(function (e) {
    $('.modal-type').toggleClass('hide');
    $(e.currentTarget).find('.icon').toggleClass('up')
  });
  // 模板选择
  $('.tpl__select').on('click', 'div', function (e) {
    var target = $(e.currentTarget);
    var modal = $('.modal-template');
    if (target.hasClass('tpl__select-active') && !modal.hasClass('hide')){
      modal.addClass('hide');
      return
    }
    modal.removeClass('hide');
    $(e.currentTarget).siblings().removeClass('tpl__select-active')
      .find('i').removeClass('tpl-arrow-up').addClass('tpl-arrow-down')
      .end().end().addClass('tpl__select-active')
      .find('i').addClass('tpl-arrow-up').removeClass('tpl-arrow-down')
  });
  // 搜索框聚焦
  $('#search').focus(function (e) {
    $('.modal-template,.modal-type,.modal-category').addClass('hide');
    $('.tpl__header__toggle').addClass('hide').find('.icon').removeClass('up');
    $('.tpl__header__button .button').prev('img').addClass('hide').end().removeClass('hide')
  }).blur(function (e) {
    $('.tpl__header__toggle').removeClass('hide');
    $('.tpl__header__button .button').prev('img').removeClass('hide').end().addClass('hide')
  });
  // 全选和取消
  $('#select-all').click(function (e) {
    var selected = $('.goods-list').find('[type=checkbox]');
    if($(this).prop('checked')){
      selected.prop('checked', true)
    }else {
      selected.prop('checked', false)
    }
  });
  $('#confirm-copy').click(function (e) {
    $('.modal-category').removeClass('hide')
  });
  $('.modal-category').on('click', '.footer', function (e) {
    $('.modal-category').addClass('hide')
  })
});
