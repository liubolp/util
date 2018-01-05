window.addEventListener('load', function () {
  $(function () {
    var getReward = {
      data: {
        toggle: '.toggle-open' // 开启红包弹窗的选择器
      },
      init () {
        this.attachEvent()
      },
      attachEvent () {
        // 开启红包
        $('.switch img').click(function (e) {
          if ($(this).hasClass('rotate')) { return }
          $(this).css({display: 'none'})
            .next().css({display: 'unset'})
            .addClass('animate')
          getReward.methods.open()
        })
        // 关闭红包
        $('.modal-open .mask').click(function () {
          var modal = $('.modal-open')
          if (!modal.find('.animate').length) {
            modal.fadeOut()
          }
        })
        // 打开红包弹框
        $(getReward.data.toggle).click(function (e) {
          $('.modal-open').fadeIn()
        })
      },
      methods: {
        // 开启红包
        open () {
          // todo 后台分发红包
        }
      }
    }
    getReward.init()
  })
})
