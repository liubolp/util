window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 调用分类选择
      $('.item').on('click', '.category-1,.category-2', function (e) {
        app.methods.callPick($(this).find('.name'))
      })
      // 添加和删除供应
      $('.demand,.supply').on('click', '.add,.remove', function (e) {
        if ($(this).hasClass('add')) {
          var html =`<li><span>选择分类</span><div class="choose"><div class="category-1"><span class="name">-选择-</span><i class="arrow"></i></div><div class="category-2"><span class="name">-选择-</span><i class="arrow"></i></div></div><div class="remove"></div></li>`
          $(this).parent().next().append(html)
        } else {
          $(this).parent().remove()
        }
      })
    },
    methods: {
      // 调用分类选择
      callPick (target) {
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
          onConfirm: function (result) {
            target.html(result[0].label)
          },
          id: 'singleLinePicker'
        })
      }
    }
  }
  app.init()
})
