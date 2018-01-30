window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {},
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 选择生日
      $('input.disabled').click(function (e) {
        app.methods.chooseDate($(this))
      })
      // 提交信息
      $('.submit').click(function (e) {
        var data = []
        $('form [type=button]').each(function (i, item) {
          data.push({
            name: $(item).attr('name'),
            value: $(item).val()
          })
        })
        app.methods.submit(data)
      })
    },
    methods: {
      /**
       * 选择生日
       * @param target { Object } 需要修改值的Jquery对象(input)
       */
      chooseDate (target) {
        weui.datePicker({
          start: 2000,
          end: new Date(),
          defaultValue: new Date().toLocaleDateString().split('/'),
          onConfirm: function (result) {
            result = `${result[0]}年${result[1]}月${result[2]}日`
            target.val(result)
          },
          id: 'datePicker'
        })
      },
      /**
       * 提交用户输入的信息
       * @param _data { Object } 不能序列化的信息
       */
      submit (_data) {
        var data = $('form').serializeArray().concat(_data)
        console.log(data)
        // todo data是序列化好的数据
      }
    }
  }
  app.init()
})
