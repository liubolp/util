window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      isModify: false, // 是否为修改分组
      groupId: '' // 修改组的id
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 展开和收起名片
      $('.group-list').on('click', '.item-title', function (e) {
        $(this).toggleClass('collapse').next().slideToggle()
      })
        .on('click', 'button.group', function (e) { // 打开选择分组弹框
          $('.modal-choose').fadeIn()
        })
      // 分组操作
      $('.group-operation').on('click', 'span', function (e) {
        if ($(this).hasClass('manage')) { // 打开管理
          $('.modal-operation').fadeIn()
        } else { // 添加组
          app.data.isModify = false
          $('.modal-add').fadeIn().find('.header').text('添加分组')
            .end().find('p').text('请输入你要添加的分组')
            .next().val('')
        }
      })
      // 添加和修改组操作
      $('.modal-add').on('click', '.cancel,.mask,.confirm', function (e) {
        if ($(this).hasClass('confirm')) {
          var groupName = $(e.delegateTarget).find('input').val()
          app.data.isModify ? app.methods.modifyGroup(groupName) : app.methods.addGroup(groupName)
        }
        $(e.delegateTarget).hide()
      })
      // 操作分组
      $('.modal-operation').on('click', '.cancel,.mask,.edit,.delete,.manage', function (e) {
        if ($(this).hasClass('manage')) {
          $('.group-manage').show()
        }
        if ($(this).hasClass('delete')) {
          // todo
          console.log('删除分组')
        }
        if ($(this).hasClass('edit')) {
          app.data.isModify = true
          app.data.groupId = $(this).parents('li').attr('data-id')
          var name = $(this).parent().prev().text()
          $('.modal-add').show().find('.header').text('修改分组')
            .end().find('p').text('请输入你要修改的分组名')
            .next().val(name)
        }
        $(e.delegateTarget).hide()
      })
      // 选择分组
      $('.modal-choose').on('click', '.mask,.cancel,.radio', function (e) {
        if ($(this).hasClass('radio')) {
          // 获取选中的组
        }
        $(e.delegateTarget).hide()
      })
      // 全选操作
      $('.group-manage').on('click', '.cancel,.delete,.toggle-all', function (e) {
        if ($(this).hasClass('toggle-all')) {
          var all = $(this).prev().find('input')
          all.prop('checked', !all.prop('checked'))
          $('.card-container').find('input[type=checkbox]').prop('checked', all.prop('checked'))
          return
        }
        if ($(this).hasClass('delete')) { // 删除选中的项目
          app.methods.deleteCard()
          return
        }
        $(e.delegateTarget).hide()
      })
      // 名片选择点击
      $('.card-container').on('click', 'li,input', function (e) {
        if (e.target.nodeName === 'INPUT') {
          e.stopPropagation()
        }
        $(this).find('input').click()
      })
    },
    methods: {
      /**
       * 添加组
       * @param name {String} 组名
       */
      addGroup (name) {
        console.log(name)
      },
      /**
       * 修改分组名
       * @param name {String} 修改的分组名
       */
      modifyGroup (name) {
        var groupId = app.data.groupId
        $('.modal-operation').find('[data-id=' + groupId + ']').find('.name').text(name)
        console.log(name, groupId)
      },
      /**
       * 删除选中的名片
       */
      deleteCard () {
        weui.confirm('你确定要删除选中的名片吗？', function () { // 确定删除
          $('.group-manage').find('input:checked').parents('li').remove()
        })
      }
    }
  }
  app.init()
})
