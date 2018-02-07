window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 添加名片操作
      $('.create').click(function (e) {
        $('.modal-add').show().find('.mask').fadeIn()
          .end().find('.content').slideToggle()
      })
      // 弹框事件处理
      $('.modal-add').on('click', '.mask,.footer', function (e) {
        if ($(this).hasClass('footer')) {
          var cardName = $(e.delegateTarget).find('input').val()
          cardName && app.methods.addCard(cardName)
        }
        $(e.delegateTarget).hide().find('.mask').fadeOut()
          .end().find('.content').slideToggle()
      })
      $('.modal-add input').on('input', function (e) {
        var val = $(this).val() ? '确定' : '取消'
        $(this).parent().next().text(val)
      })
      // 名片操作
      $('.card-list').on('click', 'button.default,button.copy,a.modify,a.delete', function (e) {
        var id = $(this).parents('li').attr('data-id')
        if ($(this).hasClass('default')) { // 设为默认
          app.methods.setDefault(id)
          $(this).parents('li').addClass('default').siblings().removeClass('default')
        }
        if ($(this).hasClass('copy')) { // 复制名片
          app.methods.copyCard(id)
        }
        if ($(this).hasClass('modify')) { // 修改名片
          app.methods.modifyCard(id)
        }
        if ($(this).hasClass('delete')) { // 删除名片
          app.methods.deleteCard(id)
        }
      })
    },
    methods: {
      /**
       * 添加名片
       * @param name {String} 输入的名片名字
       */
      addCard (name) {
        console.log(name)
      },
      /**
       * 将名片设为默认
       * @param id {String} 要设为默认名片的id号
       */
      setDefault (id) {
        console.log(id)
      },
      /**
       * 修改名片
       * @param id {String} 修改的名片id
       */
      modifyCard (id) {
        console.log(id)
      },
      /**
       * 复制名片
       * @param id {String} 修改的名片id
       */
      copyCard (id) {
        console.log(id)
      },
      /**
       * 删除名片
       * @param id {String} 要删除的名片id
       */
      deleteCard (id) {
        var target = $('li[data-id=' + id + ']')
        weui.confirm('你确定要删除【' + target.find('.name').text() + '】这个名片吗？', function () {
          console.log(id)
          // todo 执行删除操作
          target.remove()
        })
      }
    }
  }
  app.init()
})
