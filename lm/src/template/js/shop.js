$(function () {
// 打开和关闭类型选择
  $('.tpl__header__button .icon').click(function (e) {
    $('.modal-type').toggleClass('hide')
  })
  // 全选和取消
  $('#select-all').click(function (e) {
    var selected = $('.goods-list').find('[type=checkbox]')
    if ($(this).prop('checked')) {
      selected.prop('checked', true)
    } else {
      selected.prop('checked', false)
    }
  })
  // 显示复制按钮
  $('.goods-list').on('click', 'li [type=checkbox]', function (e) {
    $('.copy-info').removeClass('hide')
  })
  // 打开复制选择框
  $('#confirm-copy').click(function (e) {
    $('.modal-category').removeClass('hide')
  })
  // 取消复制选择框
  $('.modal-category').on('click', '.footer', function (e) {
    $(this).parents('.modal-category').addClass('hide')
    $('.select-options-box').addClass('hide')
    $('.select-value').removeClass('collapse')
  })
  // 自定义的下拉选择功能
  $('.custom-select').on('click', '.select-value', function (e) {
    $('.select-options-box').toggleClass('hide')
    $(e.currentTarget).toggleClass('collapse')
  }).on('click', '.select-option', function (e) {
    if ($(e.currentTarget).hasClass('add')) {
      $('#add-category').slideToggle()
    } else {
      $(e.currentTarget).siblings().removeClass('selected')
        .end().addClass('selected')
      $('.select-value').html($(e.currentTarget).find('span').html()).removeClass('collapse')
      $('.select-options-box').addClass('hide')
    }
  })
  // 处理添加分类操作
  $('#add-category .button').click(function () {
    if ($(this).prev().val()) { // 如果输入有值
      // todo 将用户输入信息插入数据库后更新页面数据
    } else {
      $(this).text('取消')
      $('#add-category').slideToggle()
    }
  })
  // 添加分类输入操作
  $('[name=category-name]').on('input', function (e) {
    var button = $('#add-category .button')
    if ($(this).val()) {
      button.text('完成')
    } else {
      button.text('取消')
    }
  })
  $('#search').focus(function (e) {
    $('.tpl__header__button .button').removeClass('hide').prev().addClass('hide')
  })
  $('.tpl__header__button .button').click(function (e) {
    $(this).prev().removeClass('hide').end().addClass('hide')
  })
})
