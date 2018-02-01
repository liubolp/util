window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      top: $('.price-list').offset().top
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
      // 显示视频
      $('.vip-list').on('click', '.toggle', function (e) {
        if ($(this).find('.arrow').hasClass('down')) {
          $(this).html('收起<i class="arrow down"></i>')
        } else {
          $(this).html('详情<i class="arrow"></i>')
        }
        $(this).find('.arrow').toggleClass('down')
        $(this).parent().next().slideToggle()
      })
      // 选择开通类型
      $('.price-list').on('click', 'li', function (e) {
        $(this).addClass('current').siblings().removeClass('current')
      })
        .on('click', '.pay', function (e) {
          var type = $(e.delegateTarget).find('li.current').attr('data-type')
          app.methods.pay(type)
        })
      // 开通会员
      $('#submit').click(function (e) {
        app.methods.pay(3)
      })
      // 滚动处理
      $(window).on('scroll', function () {
        requestAnimationFrame(app.methods.handleScroll)
      })
      // 打卡协议框
      $('.protocol').click(function () {
        $('.modal-protocol').show()
      })
      // 关闭协议框
      $('.modal-protocol .close').click(function () {
        $('.modal-protocol').hide()
      })
    },
    methods: {
      // 开通会员
      pay (type) {
        console.log(type)
        // todo
      },
      handleScroll () {
        var _top = $(window).scrollTop()
        if (_top > app.data.top - window.innerHeight) {
          $('.submit').hide()
        } else {
          $('.submit').show()
        }
      }
    }
  }
  app.init()
})
