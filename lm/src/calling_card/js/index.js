window.addEventListener('load', function () {
  $(function () {
    // 开通会员提示
    $('.banner .close').click(function (e) {
      $('.banner').slideToggle()
    })
    // 搜索条件
    $('.button').click(function (e) {
      var val = $('#search').val()
      // todo 将输入值进行检索
      var result = [];
      if (!result) { // 如果没有搜索出数据就显示没有数据的页面
        nothing()
      }
    })
    // 条件筛选
    $('.filter').on('click', 'a', function (e) {
      $(this).addClass('selected').siblings().removeClass('selected')
      if ($(this).hasClass('industry')) {
        // todo 打开行业选择
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
            value: 4,
          }
        ], {
          className: 'custom-classname',
          container: 'body',
          defaultValue: [3],
          onChange: function (result) {
            console.log(result)
          },
          onConfirm: function (result) {
            console.log(result)
          },
          id: 'singleLinePicker'
        })
      } else {
        // todo 打开地区选择
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
            value: 4,
          }
        ], {
          className: 'custom-classname',
          container: 'body',
          defaultValue: [3],
          onChange: function (result) {
            console.log(result)
          },
          onConfirm: function (result) {
            console.log(result)
          },
          id: 'singleLinePicker'
        })
      }
    })
    // 没有数据的展示
    function nothing () {
      $('.tpl-list').hide()
      $('.nothing').show()
    }
    // 有数据的展示
    function showList () {
      $('.tpl-list').show()
      $('.nothing').hide()
    }
  })
})
