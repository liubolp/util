window.addEventListener('load', function () {
  $(function () {
    var loading // 上传动画
    weui.uploader('.upload-btn', {
      url: 'http://web.lianmai.com/index.php?c=punchcard&m=uploadPic&updObjName=fileVal',
      auto: true,
      type: 'file',
      fileVal: 'fileVal',
      onBeforeQueued: function (files) {
        // `this` 是轮询到的文件, `files` 是所有文件

        if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
          weui.alert('请上传图片')
          return false // 阻止文件添加
        }
        if (this.size > 10 * 1024 * 1024) {
          weui.alert('请上传不超过10M的图片')
          return false
        }
        if (files.length > 5) { // 防止一下子选择过多文件
          weui.alert('最多只能上传5张图片，请重新选择')
          return false
        }

        return true // 阻止默认行为，不插入预览图的框架
      },
      onQueued: function () {
        // console.log(this)
        loading = weui.loading('已上传0%', {className: 'loading-box'})
        // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
        // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

        // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
        // this.stop(); // 中断上传

        return true // 阻止默认行为，不显示预览图的图像
      },
      onBeforeSend: function (data, headers) {
        // console.log(this, data, headers)
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

        // return false; // 阻止文件上传
      },
      onProgress: function (procent) {
        console.log(this, procent)
        $(loading).find('.weui-toast__content').text('已上传' + procent + '%')
        return true // 阻止默认行为，不使用默认的进度显示
      },
      onSuccess: function (ret) {
        // console.log(this, ret)
        loading.hide()
        var src = ret.imgUrl || ''
        src = src ? 'http://manage.lianmai.com' + src : ''
        $('.qr-box img').attr('src', src)
        return true // 阻止默认行为，不使用默认的成功态
      },
      onError: function (err) {
        console.log(this, err)
        loading.hide()
        $('.temporary').remove()
        weui.alert('上传图片失败')
        return true // 阻止默认行为，不使用默认的失败态
      }
    })
  })
})
