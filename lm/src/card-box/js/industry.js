window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 展开和收起名片
      $('.industry-list')
        .on('click', '.item-title', function (e) {
          $(this).find('.arrow').toggleClass('down')
            .end().next().slideToggle()
        })
        .on('click', 'button.wechat', function (e) { // 添加微信好友
          weui.dialog({
            title: '微信二维码',
            content: '<div><img src="../home/images/vip.png" style="width: 3rem;height: 3rem"></div>',
            className: 'wechat-qr',
            buttons: [{
              label: '取消',
              type: 'default'
            }]
          })
        })
        .on('click', 'button.delete', function (e) { // 删除
          weui.alert('删除')
        })
    },
    methods: {}
  }
  app.init()
})
