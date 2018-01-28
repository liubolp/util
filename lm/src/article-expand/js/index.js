window.addEventListener('load', function () {
  var app = {
    data: {
    },
    init () {
      this.attachEvent()
      new Swiper('.swiper-container', {
        autoplay: 2000,
        pagination: '.swiper-pagination',
        loop: true
      })
      this.methods.initScroll('.tabs')
    },
    attachEvent () {
      // 浮沉导航操作
      $('.nav-box').on('click', '.toggle,.mask', function (e) {
        var modal = $('.modal-nav')
        if ($(this).hasClass('mask') || modal.hasClass('show')) { // 关闭弹框
          modal.removeClass('show')
          setTimeout(function () {
            modal.hide()
          }, 200)
          return
        }
        modal.show(16, function () {
          modal.addClass('show')
        })
      })
      // 搜索处理
      $('.input-box input').on('blur', function (e) {
        var val = $(this).val()
        if (val) {
          $(this).addClass('search')
        } else {
          $(this).removeClass('search')
        }
        app.methods.search(val)
      })
      // 手动搜索
      $('.input-box i').click(function (e) {
        var val = $(this).prev().val()
        app.methods.search(val)
      })
      // 打开打赏对话框
      $('.articles .reward').click(function (e) {
        $('.modal-reward').show()
      })
      // 关闭和打赏操作
      $('.modal-reward').on('click', '.close', function (e) { // 关闭
        $('.modal-reward').hide()
      }).on('click', 'li', function (e) { // 切换金额
        $(this).addClass('selected').siblings().removeClass('selected')
        $('.amount input').val('')
      }).on('click', '.pay', function (e) { // 支付操作
        var amount = $('.amount input').val()
        amount = amount > 0 ? amount : parseFloat($('.modal-reward li.selected').text())
        $('.modal-reward').hide()
        app.methods.pay(amount)
      })
      // 置顶处理
      $('.articles').on('click', '.top,.change,.more', function (e) {
        if ($(this).hasClass('top')) {
          console.log('置顶处理')
          // todo
        }
        if ($(this).hasClass('change')) {
          console.log('换一批')
          // todo
        }
        if ($(this).hasClass('more')) {
          console.log('更多分类')
          $(this).parents('.recommend').find('.category').toggle()
        }
      })
    },
    methods: {
      /**
       * 搜索文章
       * @param keyword { String } 搜索关键词
       */
      search (keyword) {
        console.log(keyword)
        // todo
      },
      /**
       * 打赏支付
       * @param amount { Number } 支付金额
       */
      pay (amount) {
        console.log(amount)
      },
      // 滚动处理 start
      /**
       * 初始化滚动
       * @param selector { String } css选择器
       */
      initScroll (selector) {
        app.data.container = $(window)
        app.data.target = $(selector)
        app.data.top = app.data.target.position().top
        app.data.container.on('scroll', function (e) {
          requestAnimationFrame(app.methods.calcPosition)
        })
      },
      calcPosition () {
        var _top = app.data.container.scrollTop()
        if (_top >= app.data.top) {
          app.data.target.addClass('fixed')
        } else {
          app.data.target.removeClass('fixed')
        }
      }
      // 滚动处理 end
    }
  }
  app.init()
})
