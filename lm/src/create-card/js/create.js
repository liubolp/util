window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      category: '' // 用户输入的分类名
    },
    init () {
      this.attachEvent()
      this.methods.uploadImg()
      this.methods.handleScroll()
    },
    attachEvent () {
      // 增大开关点击范围
      $('.select').on('click', '.label', function (e) {
        $(this).parent().find('input').prop('checked', true)
      })
      // 获取验证码
      $('.get-code').click(function () {
        $(this).attr('disabled', true)
      })
      // 手机号验证
      $('.inputs [type=tel]').on('input', function (e) {
        var tel = $.trim($(this).val())
        if ((/^1[3|4|5|8][0-9]\d{8}$/.test(tel))) {
          $('.verify').show()
        } else {
          $('.verify').hide()
        }
      })
      // 打开行业选择
      $('.category').click(function (e) {
        $('.choose-category').show().find('.mask').fadeIn()
          .end().find('.move-container').slideToggle()
      })
      // 选择一级分类
      $('.type-list').on('click', 'li', function (e) {
        $(this).addClass('active').siblings().removeClass('active')
      })
      // 选择二级分类
      $('.outer-list').on('click', '.subtype-list li', function (e) {
        app.data.category = $(this).find('.child-type').text()
        $('.category').find('span.value').text(app.data.category || '其他')
        $('.choose-category .cancel').click()
      })
      // 处理行业选择
      $('.choose-category').on('click', '.cancel,.add-category ,.tpl__header__button button', function (e) {
        if ($(this).hasClass('cancel')) { // 关闭
          $(e.delegateTarget).hide().find('.move-container').slideToggle()
          $('.category').find('span.value').text(app.data.category || '其他')
        } else if ($(this).hasClass('add-category')) { // 手动添加
          $('.modal-add').show()
        } else { // 搜索
          var keywords = $('input[name=keywords]').val()
          app.methods.search(keywords)
        }
      })
      // 处理添加行业
      $('.modal-add').on('click', '.close,.confirm', function (e) {
        if ($(this).hasClass('confirm')) {
          app.data.category = $(this).parents('.section').find('input').val()
          $('.category').find('span.value').text(app.data.category || '其他')
          $('.choose-category').hide().find('.move-container').slideToggle()
        }
        $(e.delegateTarget).hide()
      })
      // 快速定位
      $('.nav-bar').on('click', 'a', function (e) {
        $('a.current').removeClass('current')
        $(this).addClass('current')
      })
      // 上传头像
    },
    methods: {
      /**
       * 搜素输入的关键词
       * @param keywords {String} 用户输入的关键词
       */
      search (keywords) {
        console.log(keywords)
      },
      /**
       * 上传图片
       */
      uploadImg () {
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
            $('.base-info img').attr('src', src)
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
      },
      /**
       * 处理滚动
       */
      handleScroll () {
        var data = {
          startY: 0,
          distance: 0
        }
        $('.modal-template .container').on('touchstart', function (e) {
          data.startY = e.originalEvent.changedTouches[0].screenY
        }).on('touchmove', function (e) {
          data.distance = e.originalEvent.changedTouches[0].screenY - data.startY
        }).on('scroll', function (e) {
          requestAnimationFrame(calcPosition)
        })
        function calcPosition () {
          var target, // 将要移动到的目标
            buffer, // 是否有可以移动的目标
            offset, // 移动目标的实时位置
            current = $('.nav-bar a.current') // 当前显示的目标
          if (data.distance > 0) { // 向下滑
            buffer = current.parent().prev()
            target = buffer.length && buffer
            offset = target ? $('#lm-' + target.text()).offset().top : 0
            if (offset >= 80) {
              target.siblings().find('.current').removeClass('current')
              target.find('a').addClass('current')
            }
          } else { // 向上滑
            buffer = current.parent().next()
            target = buffer.length && buffer
            offset = target ? $('#lm-' + target.text()).offset().top : 0
            if (offset < 80) {
              target.siblings().find('.current').removeClass('current')
              target.find('a').addClass('current')
            }
          }
        }
      }
    }
  }
  app.init()
})
