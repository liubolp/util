window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 标签切换
      $('.filters').on('click', 'li', function (e) {
        if ($(this).hasClass('filter')) {
          $('.filter-box').toggle()
        } else {
          $('.filter-box').hide()
        }
        $(this).addClass('current').siblings().removeClass('current')
      })
      // 选择日期
      $('.date-box').on('click', '.date-start,.date-end', function (e) {
        app.methods.datePicker($(this))
      })
      // 选择等级
      $('.level-list').on('click', 'li', function (e) {
        $(this).toggleClass('selected')
      })
      // 筛选框处理
      $('.filter-box').click(function (e) {
        e.stopPropagation()
        var target = $(e.target)
        if (target.hasClass('cancel') || target.hasClass('filter-box')) { // 关闭框
          $('.filter-box').hide()
        }
        if (target.hasClass('confirm')) {
          $('.filter-box').hide()
          console.log(1)
          // 处理过滤
        }
      })
    },
    methods: {
      datePicker (target) {
        weui.datePicker({
          start: 2000,
          end: new Date(),
          defaultValue: new Date().toLocaleDateString().split('/'),
          onConfirm: function (result) {
            result = `${result[0]}年${result[1]}月${result[2]}日`
            target.find('input').val(result)
          },
          id: 'datePicker'
        })
      }
    }
  }
  app.init()
})
