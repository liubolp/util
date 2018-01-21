window.addEventListener('DOMContentLoaded', function (e) {
  var app = {
    data: {
      src: '', // 用户上传图片后的地址
      html: '' // 编辑后的html
    },
    init () {
      this.attachEvent()
      this.methods.uploadImg()
    },
    attachEvent () {
      // 打开编辑弹窗
      $('.container>.edit').click(function (e) {
        $('.modal-edit').show().find('.mask').fadeIn()
          .end().find('.content').slideToggle()
      })
      // 编辑框处理
      $('.modal-edit').on('click', '.mask,.footer>button', function (e) {
        if ($(this).hasClass('confirm')) {
          // todo 获取编辑后的内容
          var html = $(e.delegateTarget).find('.content>.section').html()
          app.data.html = html
          $('.shop-details').show().find('>.content').html(html)
        }
        $(e.delegateTarget).hide().find('.mask').fadeOut()
          .end().find('.content').slideToggle()
      })
      // 选择分类
      $('.items .category').click(function (e) {
        app.methods.dataPick($(this).find('input'))
      })
      // 发布商品
      $('#submit').click(function (e) {
        var target = $('ul.items'),
          title = target.find('[name=title]').val(),
          category = target.find('[name=category]').val(),
          price = target.find('[name=price]').val(),
          discount = target.find('[name=discount]').val()
        app.methods.publish({title, category, price, discount, src: app.data.src, html: app.data.html})
      })
    },
    methods: {
      /**
       * 发布商品信息
       * @param data { Object } 当前商品的信息
       */
      publish (data) {
        console.log(data)
        // todo
      },
      /**
       * 分类选择
       * @param target { Object } 选择分类的input
       */
      dataPick (target) {
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
          container: 'body',
          defaultValue: [3],
          onConfirm: function (result) {
            target.val(result[0].label)
          }
        })
      },
      // 上传图片
      uploadImg () {
        var loading // 上传动画
        weui.uploader('.img-box', {
          url: 'http://web.lianmai.com/index.php?c=punchcard&m=uploadPic&updObjName=fileVal',
          auto: true,
          type: 'file',
          fileVal: 'fileVal',
          onBeforeQueued: function onBeforeQueued (files) {
            // `this` 是轮询到的文件, `files` 是所有文件

            if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
              weui.alert('请上传图片')
              return false // 阻止文件添加
            }
            if (this.size > 10 * 1024 * 1024) {
              weui.alert('请上传不超过10M的图片')
              return false
            }
            if (files.length > 5) {
              // 防止一下子选择过多文件
              weui.alert('最多只能上传5张图片，请重新选择')
              return false
            }

            return true // 阻止默认行为，不插入预览图的框架
          },
          onQueued: function onQueued () {
            // console.log(this)
            loading = weui.loading('已上传0%', { className: 'loading-box' })
            // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
            // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

            // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
            // this.stop(); // 中断上传

            return true // 阻止默认行为，不显示预览图的图像
          },
          onBeforeSend: function onBeforeSend (data, headers) {
            // console.log(this, data, headers)
            // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
            // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

            // return false; // 阻止文件上传
          },
          onProgress: function onProgress (procent) {
            $(loading).find('.weui-toast__content').text('已上传' + procent)
            return true // 阻止默认行为，不使用默认的进度显示
          },
          onSuccess: function onSuccess (ret) {
            // console.log(this, ret)
            loading.hide()
            return true // 阻止默认行为，不使用默认的成功态
          },
          onError: function onError (err) {
            console.log(this, err)
            loading.hide()
            $('.temporary').remove()
            weui.alert('上传图片失败')
            return true // 阻止默认行为，不使用默认的失败态
          }
        })
      }
    }
  }
  app.init()
})
