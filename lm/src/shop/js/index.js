window.addEventListener('load', function () {
  var app = {
    data: {
      defaultColor: '#f00', // 打开颜色选择后的默认值
      currentColor: '' // 当前选选择的颜色
    },
    init () {
      this.attachEvent()
      this.methods.uploadImg()
      $('.content .add').spectrum({
        color: app.data.defaultColor,
        move: function (e) {
          app.data.currentColor = e.toHexString()
          requestAnimationFrame(app.methods.handleColor)
        },
        change: function (e) {
          app.methods.addColor(e.toHexString())
        },
        hide: function (e) {
          app.methods.cancelColor()
        }
      })
    },
    attachEvent () {
      // 更换颜色
      $('.theme-list').on('click', 'li', function (e) {
        $(this).addClass('current').siblings().removeClass('current')
        app.methods.changeTheme()
      })
      // 提交内容
      $('.submit-box .submit').click(function (e) {
        app.methods.submit()
      })
    },
    methods: {
      /**
       * 动态颜色选择
       */
      handleColor () {
        $('.content .add').css({background: app.data.currentColor})
      },
      /**
       * 添加主题颜色
       * @param color { String } 选中的颜色
       */
      addColor (color) {
        var target = $('.theme-list li:first-child')
        var html = target.clone()
        html.removeClass('current')
          .find('.title').css({background: color})
        target.before(html)
      },
      /**
       * 取消颜色选择
       */
      cancelColor () {
        $('.content .add').css({background: 'inherit'})
      },
      /**
       * 更换主题
       */
      changeTheme () {},
      /**
       * 提交修改
       */
      submit () {
        //
      },
      uploadImg () {
        var loading // 上传动画
        weui.uploader('.banner', {
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
            console.log(arguments, 1)
            console.log(this, procent)
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
