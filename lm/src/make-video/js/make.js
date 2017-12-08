window.addEventListener('load', function () {
  $(function () {
    // 保存信息事件
    $('button.save').click(function (e) {
      var src = $('.video-poster .avatar').attr('src')
      var title = $('[name=title]').val()
      var desc = $('[name=description]').val()
      console.log(src, title, desc)
      // todo 可根据情况做验证后将数据发送到后台
    })
    // 更换视频图片
    var loading // 上传动画
    weui.uploader('.video-poster', {
      url: 'http://web.lianmai.com/index.php?c=punchcard&m=uploadPic&updObjName=fileVal',
      auto: true,
      type: 'file',
      fileVal: 'fileVal',
      compress: {},
      onBeforeQueued: function (files) {
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
        return true // 阻止默认行为，不显示预览图的图像
      },
      onBeforeSend: function (data, headers) {
        // console.log(this, data, headers)
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
        // return false; // 阻止文件上传
      },
      onProgress: function (procent) {
        $(loading).find('.weui-toast__content').text('已上传' + procent + '%')
        return true // 阻止默认行为，不使用默认的进度显示
      },
      onSuccess: function (ret) {
        // console.log(this, ret)
        loading.hide()
        // todo 上传成功后将返回的地址赋值给对应的img标签
        var src = ret.imgUrl || ''
        src = src ? 'http://manage.lianmai.com' + src : ''
        $('.video-poster .avatar').attr('src', src)
        return true // 阻止默认行为，不使用默认的成功态
      },
      onError: function (err) {
        console.log(this, err)
        loading.hide()
        weui.alert('上传图片失败')
        return true // 阻止默认行为，不使用默认的失败态
      }
    })
  })
})
