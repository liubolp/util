window.addEventListener('load', function () {
  var app = {
    data: {
      isAdd: true, // 分类操作类型(是否为新增，新增为true，修改为false)
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
      // 添加分类
      $('.category .add').click(function (e) {
        app.data.isAdd = true
        $('.modal-category').show()
          .find('.title').text('添加分类')
          .end().find('.mask').fadeIn()
          .end().find('.content').slideToggle()
      })
      // 弹窗操作
      $('.modal-category').on('click', '.mask,.submit,.close', function (e) {
        if ($(this).hasClass('submit')) { // 提交输入的内容
          var ctx = $(e.delegateTarget).find('textarea').val()
          app.methods.submit(ctx)
        }
        // 关闭弹窗
        $(e.delegateTarget).hide().find('.mask').fadeOut()
          .end().find('.content').slideToggle()
      })
      // 分类操作
      $('.category').on('click', '.operation i', function (e) {
        var type,
          item = $(this).parents('li'),
          id = item.attr('data-id')
        if ($(this).hasClass('edit')) { // 编辑
          app.methods.modify(id, item)
          return
        }
        if ($(this).hasClass('delete')) { // 删除
          app.methods.remove(id, item)
          return
        }
        type = $(this).hasClass('up') ? 'up' : 'down'
        app.methods.moveStep(type, id, item)
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
      /**
       * 排序移动操作
       * @param type { String } 'up'上移; 'down'下移
       * @param id { String } 当前操作的分类id
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
          target.length && (target.after(item.remove()))
        }
      },
      /**
       * 修改分类信息
       * @param id { String } 当前修改的分类id
       * @param target { Object } 当前列表项的jquery对象
       */
      modify (id, target) {
        console.log(id)
        app.data.isAdd = false
        var value = target.find('.name').text()
        $('.category .add').click()
        $('.modal-category').find('.title').text('修改分类')
          .end().find('textarea').val(value)
      },
      /**
       * 删除分类
       * @param id { String } 分类id
       * @param target { Object } 当前列表项的jquery对象
       */
      remove (id, target) {
        weui.confirm('你确定要删除这个分类吗？', function (e) {
          target.remove()
        }, function (e) {
          // 取消
        })
      }
    }
  }
  app.init()
})
