window.addEventListener('load', function () {
  $(function () {
    var card = {
      data: {},
      init () {
        this.attachEvent()
        this.methods.getBackground()
      },
      attachEvent () {
        // 保存新增名片信息
        $('.add-save').click(function (e) {
          var name = $(this).prev().val()
          if (name) {
            card.methods.addCard(name)
          }
          $('.modal-add').hide()
        })
        // 新增输入信息处理
        $('.modal-add input').on('input', function (e) {
          var val = $(this).val() ? '保存' : '取消'
          $(this).next().html(val)
        })
        // 搜索处理
        $('.search-bar .search').click(function (e) {
          var value = $(this).prev().val()
          card.methods.searchCard(value)
        })
        // 删除和修改
        $('.card-list').on('click', '.delete', function (e) { // 删除
          card.methods.deleteCard($(this).parents('li'))
        })
          .on('click', '.edit', function (e) { // 修改
            card.methods.editCard($(this).parents('li'))
          })
          .on('click', '.use', function (e) { // 设为默认
            card.methods.setDefault($(this).parents('li'))
          })
          .on('click', 'div.add', function (e) { // 新增名片
            $('.modal-add').show()
          })
      },
      methods: {
        // 为每个名片更新背景图片
        getBackground () {
          $('.card-list .content').each(function (e) {
            var url = $(this).attr('data-src')
            $(this).css({'background-image': 'url(' + url + ')'})
          })
        },
        /**
         * 设为默认
         * @param target {Object} 当前操作的li标签Jquery对象
         */
        setDefault (target) {
          $('.card-list .use').removeClass('current')
          target.find('.use').addClass('current')
          // todo
        },
        /**
         * 添加名片
         * @param name {String} 新增名片名称
         */
        addCard (name) {
          console.log(name)
          // todo 添加名片操作
        },
        // 搜索名片
        searchCard (name) {
          console.log(name)
          // TODO
        },
        /**
         * 删除名片
         * @param target {Object} 当前操作的li标签Jquery对象
         */
        deleteCard (target) {
          console.log(target)
          // todo
        },
        /**
         * 修改名片
         * @param target {Object} 当前操作的li标签Jquery对象
         */
        editCard (target) {
          console.log(target)
          // todo
        }
      }
    }
    card.init()
  })
})
