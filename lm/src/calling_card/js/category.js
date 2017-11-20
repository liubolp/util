window.addEventListener('load', function () {
  $(function () {
    // 选择区域
    $('.choose .area').click(function (e) {
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
    })
    $('.choose .search').click(function (e) {
      var val = $('.area .content').val()
      // todo 根据值进行搜索
      var result = []
      if (!result) { // 如果没有数据就显示空数据的页面
        nothing()
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
