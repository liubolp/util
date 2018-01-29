window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
    },
    init () {
      this.attachEvent()
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
      // 过滤操作
      $('.filters').on('click', '.container', function (e) {
        var type
        if ($(this).hasClass('industry')) { // 选行业
          type = 'industry'
        }
        else if ($(this).hasClass('city')) { // 选城市
          type = 'city'
        } else { // 认证方式
          type = 'verify'
        }
        app.methods.filterBy(type, $(this).find('.name'))
      })
      // 加微信和好友
      $('.sm-list').on('click', 'button', function (e) {
        if ($(this).hasClass('wechat')) { // 加微信
          console.log('加微信')
        }
        if ($(this).hasClass('friend')) { // 加好友
          console.log('加好友')
        }
      })
    },
    methods: {
      /**
       * 筛选过滤操作
       * @param type { String } 'industry':行业;'city'：城市;'verify':认证
       * @param target { Object } 需要更改的Jquery对象
       */
      filterBy (type, target) {
        console.log(type)
        weui.picker([{
          label: '飞机票',
          value: 0,
          disabled: true // 不可用
        }, {
          label: '火车票',
          value: 1
        }, {
          label: '汽车票',
          value: 3
        }, {
          label: '公车票',
          value: 4
        }], {
          container: 'body',
          defaultValue: [3],
          onConfirm: function onConfirm (result) {
            target.text(result[0].label)
          }
        })
      }
    }
  }
  app.init()
})
