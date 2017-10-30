$(function () {
  $('.add-category').click(function (e) {
    $('.mode-category').removeClass('hide')
  })
  $('.add-complete').click(function (e) {
    $('.mode-category').addClass('hide')
  })
  $('.category-name').on('input',function (e) {
    $('.add-complete').html('完成')
  }).on('change', function (e) {
    if (!$('.category-name').val()) {
      $('.add-complete').html('关闭')
    }
  })
})
export default {
  data () {
    return {
      a: [100, 2]
    }
  },
  created () {
    var arr = [3, 5]
    return [100, ...arr]
    this.$on('test', res => {
      console.log(res)
    })
  }
}
