window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      top: $('.gift-list').offset().top
    },
    init () {
      this.attachEvent()
      new Swiper('.swiper-container', {
        direction: 'vertical',
        autoplay: 3000,
        loop: true
      })
    },
    attachEvent () {
      // 滚动处理
      $(window).on('scroll', function () {
        requestAnimationFrame(app.methods.handleScroll)
      })
    },
    methods: {
      handleScroll () {
        var _top = $(window).scrollTop()
        if (_top > app.data.top - window.innerHeight) {
          $('#submit').hide()
        } else {
          $('#submit').show()
        }
      }
    }
  }
  app.init()
})
