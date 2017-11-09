window.addEventListener('load', function () {
  $(function () {
    var swiper = new Swiper('.swiper-container', {
      autoplay: 5000,
      pagination: '.swiper-pagination',
      loop: true
    })
    $('h3.title').click(function () {
      $('.accordion .list').not($(this).next()).slideUp()
      $(this).next().slideToggle()
      $('.title .toggle').not($(this).find('.toggle')).removeClass('fold')
      $(this).find('.toggle').toggleClass('fold')
    })
  })
})
