window.addEventListener('load', function () {
  var app = {
    data: {
      id: '11', // 当前商品的id
      goodsList: [] // 购物车商品列表
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 当前商品操作
      $('.fixed-header').on('click', '.add,.order', function (e) {
        if ($(this).hasClass('add')) { // 添加到购物车
          app.methods.updateCart('add', app.data.id)
        } else { // 直接下单
          app.methods.order()
        }
      })
      // 将推荐商品添加到购物车
      $('.shop-list').on('click', '.cart', function (e) {
        var id = $(this).attr('data-id'),
          type = $(this).hasClass('has') ? 'remove' : 'add'
        app.methods.updateCart(type, id)
        $(this).toggleClass('has')
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
      }
    }
  }
  app.init()
})
