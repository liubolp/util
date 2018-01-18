window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      isAdd: true, // 当前模式是否为新增分类
      articleId: '', // 当前操作文章id
      categoryId: '' // 当前修改的分类id
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 搜索处理
      $('.input-box input').on('blur', function (e) {
        var val = $(this).val()
        if (val) {
          $(this).addClass('search')
        } else {
          $(this).removeClass('search')
        }
        app.methods.search(val)
      })
      // 手动搜索
      $('.input-box i').click(function (e) {
        var val = $(this).prev().val()
        app.methods.search(val)
      })
      // 筛选处理
      $('.filters').on('click', '.sort,.category', function (e) {
        $(this).toggleClass('current')
          .siblings().removeClass('current')
      })
      // 筛选条件处理
      $('.sort>div,.category>div').on('click', 'li', function (e) {
        e.stopPropagation()
        $(this).addClass('selected').siblings().removeClass('selected')
        if ($(e.delegateTarget).hasClass('sort')) { // 排序操作
          var sort = $(this).attr('data-sort')
          app.methods.sortBy(sort)
          return
        }
        if ($(e.delegateTarget).hasClass('category')) { // 分类过滤操作
          var type = $(this).attr('data-type')
          app.methods.filterBy(type)
        }
      })
        .on('click', 'button', function (e) { // 分类处理
          if ($(this).hasClass('create')) { // 创建分类
            $('.modal-edit').fadeIn()
              .find('.header').text('添加分类')
              .end().find('.desc').text('请输入你要添加的分类')
            app.data.isAdd = true
          } else { // 管理分类
            $('.modal-manage').fadeIn()
          }
        })
      // 文章操作处理
      $('.article-list').on('click', 'button,.delete', function (e) {
        var id
        if ($(this).hasClass('delete')) { // 删除
          id = $(this).next().attr('data-id')
          weui.confirm('你确定要删除这篇文章吗？', function () {
            app.methods.deleteArticle(id)
          })
        } else { // 操作
          id = $(this).attr('data-id')
          app.methods.actionSheet(id)
        }
      })
      // 添加分类弹框处理
      $('.modal-edit').on('click', '.mask,button', function (e) {
        if ($(this).hasClass('confirm')) { // 确定信息更改
          var val = $(e.delegateTarget).find('input').val()
          app.methods.updateCategory(val)
        }
        $(e.delegateTarget).hide()
      })
      // 管理分类弹框
      $('.modal-manage').on('click', 'i,.footer,.mask', function (e) {
        var id
        if ($(this).hasClass('edit')) { // 编辑
          app.data.categoryId = $(this).parents('li').attr('data-id')
          var name = $(this).parents('li').attr('data-name')
          $(e.delegateTarget).hide()
          $('.modal-edit').fadeIn()
            .find('.header').text('编辑分类')
            .end().find('.desc').text('请输入你要修改的分类名')
            .end().find('input').val(name)
          app.data.isAdd = false
        }
        if ($(this).hasClass('delete')) { // 删除
          id = $(this).parents('li').attr('data-id')
          weui.confirm('你确定要删除这个分类吗？', function () {
            app.methods.deleteCategory(id)
          })
        }
        $(e.delegateTarget).hide()
      })
      // 类别设置弹框
      $('.modal-type').on('click', '.mask,.footer,button,li', function (e) {
        if (this.nodeName === 'LI') {
          $(this).addClass('selected').siblings().removeClass('selected')
          app.methods.changeCategory($(this).attr('data-id'))
          return
        }
        if (this.nodeName === 'BUTTON') {
          $('.modal-edit').fadeIn()
            .find('.header').text('添加分类')
            .end().find('.desc').text('请输入你要添加的分类')
          app.data.isAdd = true
        }
        $(e.delegateTarget).hide()
      })
      // 设置弹框处理
      $('.modal-setting').on('click', '.mask,.footer,.right', function (e) {
        if ($(this).hasClass('right')) {
          var target = $(this).find('input'),
            status = target.prop('checked'),
            type = target.attr('name')
          app.methods.articleSetting(type, status)
          return
        }
        $(e.delegateTarget).hide()
      })
    },
    methods: {
      /**
       * 搜索文章
       * @param keyword { String } 搜索关键词
       */
      search (keyword) {
        console.log(keyword)
        // todo
      },
      /**
       * 排序方式
       * @param sort { String }
       */
      sortBy (sort) {
        console.log(sort)
        // todo
      },
      /**
       * 过滤方式
       * @param type { String }
       */
      filterBy (type) {
        console.log(type)
        // todo
      },
      /**
       * 更新分类信息
       * @param name { String } 当前输入的分类名
       */
      updateCategory (name) {
        console.log(name)
        if (app.data.isAdd) { // 新增操作
          // todo
        } else { // 修改操作
          var categoryId = app.data.categoryId
          console.log(categoryId)
          // todo
        }
      },
      /**
       * 打开操作选项
       * @param id { String } 当前操作文章的id
       */
      actionSheet (id) {
        app.data.articleId = id
        weui.actionSheet(
          [
            {
              label: '编辑',
              onClick: function () {
                // todo 跳转到编辑页
              }
            },
            {
              label: '设置',
              onClick: function () {
                $('.modal-setting').fadeIn()
              }
            },
            {
              label: '分类',
              onClick: function () {
                $('.modal-type').fadeIn()
              }
            },
            {
              label: '删除',
              onClick: function () {
                weui.confirm('你确定要删除这篇文章吗？', function () {
                  app.methods.deleteArticle(id)
                })
              }
            }
          ],
          [
            {
              label: '取消',
              onClick: function () {
                console.log('取消')
              }
            }
          ]
        )
      },
      /**
       * 删除文章
       * @param id { String } 删除文章的id
       */
      deleteArticle (id) {
        console.log(id)
        // todo
      },
      /**
       * 删除分类
       * @param id { String } 分类id
       */
      deleteCategory (id) {
        console.log(id)
        // todo
      },
      /**
       * 更改文章分类
       * @param id { String } 要更换的分类id
       */
      changeCategory (id) {
        console.log(id)
        // todo
      },
      /**
       * 文章设置
       * @param type { String } 要设置的类别(reward|public|comment|top|voice)
       * @param status { Boolean } 当前类别的状态
       */
      articleSetting (type, status) {
        console.log(type, status)
      }
    }
  }
  app.init()
})
