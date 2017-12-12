window.addEventListener('load', function () {
  $(function () {
    $('.tab').on('click', 'span', function (e) {
      $(this).addClass('current')
        .siblings().removeClass('current')
    })
  })
})
