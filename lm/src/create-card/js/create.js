window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      category: '' // 用户输入的分类名
    },
    init () {
      this.attachEvent()
      this.methods.test()
    },
    attachEvent () {
      // 增大开关点击范围
      $('.select').on('click', '.label', function (e) {
        $(this).parent().find('input').prop('checked', true)
      })
      // 获取验证码
      $('.get-code').click(function () {
        $(this).attr('disabled', true)
      })
      // 手机号验证
      $('.inputs [type=tel]').on('input', function (e) {
        var tel = $.trim($(this).val())
        if ((/^1[3|4|5|8][0-9]\d{8}$/.test(tel))) {
          $('.verify').show()
        } else {
          $('.verify').hide()
        }
      })
      // 打开行业选择
      $('.category').click(function (e) {
        $('.choose-category').show().find('.mask').fadeIn()
          .end().find('.move-container').slideToggle()
      })
      // 处理行业选择
      $('.choose-category').on('click', '.cancel,.add-category ,.tpl__header__button button', function (e) {
        if ($(this).hasClass('cancel')) { // 关闭
          $(e.delegateTarget).hide().find('.move-container').slideToggle()
        } else if ($(this).hasClass('add-category')) { // 手动添加
          $('.modal-add').show()
        } else { // 搜索
          var keywords = $('input[name=keywords]').val()
          app.methods.search(keywords)
        }
      })
      // 处理添加行业
      $('.modal-add').on('click', '.close,.confirm', function (e) {
        if ($(this).hasClass('confirm')) {
          app.data.category = $(this).parents('.section').find('input').val()
          $('.category').find('span.value').text(app.data.category)
          $('.choose-category').hide().find('.move-container').slideToggle()
        }
        $(e.delegateTarget).hide()
      })
      // 快速定位
      $('.nav-bar').on('click', 'a', function (e) {
        $('a.current').removeClass('current')
        $(this).addClass('current')
      })
    },
    methods: {
      /**
       * 搜素输入的关键词
       * @param keywords {String} 用户输入的关键词
       */
      search (keywords) {
        console.log(keywords)
      },
      test () {
        var data = {
          startY: 0,
          distance: 0
        }
        $('.modal-template .container').on('touchstart', function (e) {
          data.startY = e.originalEvent.changedTouches[0].screenY
        }).on('touchmove', function (e) {
          data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
        }).on('scroll', function (e) {
          requestAnimationFrame(calcPosition)
        })
        function calcPosition () {
          var target, // 将要移动到的目标
            buffer, // 是否有可以移动的目标
            offset, // 移动目标的实时位置
            current = $('.nav-bar a.current') // 当前显示的目标
          if (data.distance > 0) { // 向下滑
            buffer = current.parent().prev()
            target = buffer.length && buffer
            offset = target ? $('#lm-' + target.text()).offset().top : 0
            if (offset >= 80) {
              target.siblings().find('.current').removeClass('current')
              target.find('a').addClass('current')
            }
          } else { // 向上滑
            buffer = current.parent().next()
            target = buffer.length && buffer
            offset = target ? $('#lm-' + target.text()).offset().top : 0
            if (offset < 80) {
              target.siblings().find('.current').removeClass('current')
              target.find('a').addClass('current')
            }
          }
        }
      }
    }
  }
  app.init()
})
