window.addEventListener('load', function () {
  var app = {
    data: {
      selectedList: [] // 存放选中商品的id
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 浮沉导航操作
      $('.nav-box').on('click', '.toggle,.mask', function (e) {
        var modal = $('.modal-nav')
        if ($(this).hasClass('mask')) { // 关闭弹框
          modal.fadeOut()
          return
        }
        modal.fadeIn()
      })
      // 分类选择
      $('.filter-category .choose').click(function (e) {
        app.methods.chooseCategory($(this))
      })
      // 商品过滤操作
      $('.filter-list').on('click', 'span', function (e) {
        var type = 'sale'
        if ($(this).hasClass('sale')) {
          type = 'sale'
        } else if ($(this).hasClass('cancel')) {
          type = 'cancel'
        } else {
          type = 'recommend'
        }
        $(this).addClass('current').siblings().removeClass('current')
        app.methods.filter(type)
      })
      // 搜索商品内容
      $('.search-box .search').click(function (e) {
        var content = $(this).prev().val()
        app.methods.search(content)
      })
      // 商品操作
      $('.shop-list').on('click', 'input', function (e) { // 开启商品操作栏
        var type = $(this).prop('checked') ? 'select' : 'remove',
          id = $(this).attr('data-id')
        app.methods.toggleBar(type, id)
      })
        .on('click', '.sort span', function (e) { // 排序操作
          var type = $(this).hasClass('up') ? 'up' : 'down',
            item = $(this).parents('li'),
            id = item.find('input').attr('data-id')
          app.methods.moveStep(type, id, item)
        })
      // 商品操作
      $('.operation-box').on('click', '.checkbox,button', function (e) {
        if ($(this).hasClass('checkbox')) { // 全选
          var type = $(this).find('input').prop('checked') ? 'select' : 'remove'
          app.methods.selectAll(type)
          return
        }
        if ($(this).hasClass('cancel')) { // 下架
          app.methods.cancel()
          return
        }
        if ($(this).hasClass('recommend')) { // 推荐
          app.methods.recommend()
          return
        }
        if ($(this).hasClass('delete')) { // 删除
          app.methods.remove()
        }
      })
    },
    methods: {
      // 二级筛选操作
      /**
       * 商品筛选操作
       * @param type { String } 'sale'售卖中；'cancel'已下架；'recommend' 推荐商品
       */
      filter (type) {
        console.log(type)
      },
      /**
       * 筛选分类
       * @param target { Object } 要替换内容的jquery对象
       */
      chooseCategory (target) {
        // 单列picker
        weui.picker([
          {
            label: '飞机票',
            value: 0,
            disabled: true // 不可用
          },
          {
            label: '火车票',
            value: 1
          },
          {
            label: '汽车票',
            value: 3
          },
          {
            label: '公车票',
            value: 4
          }
        ], {
          className: 'custom-classname',
          container: 'body',
          defaultValue: [3],
          onChange: function (result) {
            console.log(result)
          },
          onConfirm: function (result) {
            target.html(result[0].label + '<i class="arrow"></i>')
            // todo
          },
          id: 'singleLinePicker'
        })
      },
      /**
       * 搜索商品
       * @param key { String } 搜索关键词
       */
      search (key) {
        console.log(key)
        // todo
      },
      /**
       * 开启和取消操作栏
       * @param type { String } 'select'选中；'remove'取消
       * @param id { String } 当前操作的商品id
       */
      toggleBar (type, id) {
        var list = app.data.selectedList
        if (type === 'select') { // 选中
          list.push(id)
        } else { // 取消
          var index = list.indexOf(id)
          if (index >= 0) {
            list.splice(index, 1)
          }
        }
        if (list.length === 0) {
          $('.operation-box').hide()
        } else {
          $('.operation-box').show()
        }
      },
      /**
       * 全选和取消全选
       * @param type { String } 'select'选中；'remove'取消
       */
      selectAll (type) {
        var input = $('.shop-list input'), list = app.data.selectedList = []
        if (type === 'select') {
          input.prop('checked', true)
            .each(function (i, item) {
              list.push($(item).attr('data-id'))
            })
        } else {
          input.prop('checked', false)
          list = []
          $('.operation-box').hide()
        }
      },
      /**
       * 排序移动操作
       * @param type { String } 'up'上移; 'down'下移
       * @param id { String } 当前操作的商品id
       * @param item { Object } 当前列表项的jquery对象
       */
      moveStep (type, id, item) {
        var target
        if (type === 'up') { // 上移操作
          target = item.prev()
          target.length && (target.before(item.remove()))
          // TODO 如果后台要排序，可将id拿到后台排序
        } else { // 下移操作
          target = item.next()
          target.length && (target.before(item.remove()))
        }
      },
      /**
       * 下架商品
       */
      cancel () {
        var list = app.data.selectedList
        console.log(list)
      },
      /**
       * 推荐商品
       */
      recommend () {
        var list = app.data.selectedList
        console.log(list)
      },
      /**
       * 删除商品
       */
      remove () {
        var list = app.data.selectedList
        console.log(list)
        var removeList = []
        list.forEach(function (item) {
          removeList.push($('.shop-list input[data-id=' + item + ']').parents('li'))
        })
        removeList.forEach(function (item) {
          item.remove()
        })
        list.length = 0
        removeList = []
      }
    }
  }
  app.init()
})
