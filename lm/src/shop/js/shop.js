window.addEventListener('load', function () {
  var app = {
    data: {
      goodsList: [] // 购物车商品列表
    },
    init () {
      this.attachEvent()
      this.methods.updateTotal()
    },
    attachEvent () {
      // 关闭提示会员等级提示框
      $('.modal-level').on('click', '.mask,.close', function (e) {
        $(e.delegateTarget).fadeOut()
      })
      // 浮沉导航操作
      $('.nav-box').on('click', '.toggle,.mask', function (e) {
        var modal = $('.modal-nav')
        if ($(this).hasClass('mask')) { // 关闭弹框
          modal.fadeOut()
          return
        }
        modal.fadeIn()
      })
      // 将商品添加到购物车
      $('.shop-list').on('click', '.cart', function (e) {
        var id = $(this).attr('data-id'),
          type = $(this).hasClass('has') ? 'remove' : 'add'
        app.methods.updateCart(type, id)
        $(this).toggleClass('has')
      })
      // 查看更多
      $('.show-more').click(function (e) {
        app.methods.showMore()
      })
    },
    methods: {
      /**
       * 直接下单
       */
      order () {},
      /**
       * 更新购物车信息
       * @param type { String } 'add'添加到购物车,'remove'移除购物车
       * @param id { String } 添加或移除的商品id
       */
      updateCart (type, id) {
        var list = app.data.goodsList
        if (type === 'add') {
          list.push(id)
        } else {
          var index = list.indexOf(id)
          if (index >= 0) {
            list.splice(index, 1)
          }
        }
        this.updateTotal()
      },
      /**
       * 更新购物车数量
       */
      updateTotal () {
        var target = $('.shop-nav .count')
        if (target.length) {
          target.text(app.data.goodsList.length)
        }
      },
      /**
       * 显示更多
       */
      showMore () {}
    }
  }
  app.init()
})
