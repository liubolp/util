window.addEventListener('load', function () {
  var app = {
    data: {
      isAdd: true, // 分类操作类型(是否为新增)
      selectedList: [] // 存放选中商品的id
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 添加分类
      $('.category .add').click(function (e) {
        app.data.isAdd = true
        $('.modal-category').show()
          .find('.mask').fadeIn()
          .end().find('.content').slideToggle()
      })
      // 弹窗操作
      $('.modal-category').on('click', '.mask,.submit', function (e) {
        if ($(this).hasClass('submit')) { // 提交输入的内容
          var ctx = $(e.delegateTarget).find('textarea').val()
          app.methods.submit(ctx)
        }
        $(e.delegateTarget).hide().find('.mask').fadeOut()
          .end().find('.content').slideDown()
      })
    },
    methods: {
      /**
       * 提交分类信息
       * @param ctx { String } 分类名
       */
      submit (ctx) {
        console.log(ctx)
        // todo
      },
      
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
          target.before(item.remove())
          // TODO 如果后台要排序，可将id拿到后台排序
        } else { // 下移操作
          target = item.next()
          target.after(item.remove())
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
