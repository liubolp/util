window.addEventListener('DOMContentLoaded', function () {
  $(function () {
    var play = {
      data: {},
      init () {
        this.attachEvent()
      },
      attachEvent () {
        // 打开工具栏目和处理背景音乐
        $('.toggle-tool').on('click', 'span', function (e) {
          e.stopPropagation()
          if ($(this).hasClass('tool')) {
            $('.toggle-tool').addClass('hide')
            $('.toolbar').slideDown()
          } else if ($(this).hasClass('pause')) { // 是暂停状态
            $(this).removeClass('pause')
            $('#audio')[0].play()
            $(this).addClass('rotate')
          } else {
            $(this).addClass('pause')
            $('#audio')[0].pause()
            $(this).removeClass('rotate')
          }
        })
        // 工具栏按钮操作
        $('.toolbar').on('click', 'li', function (e) {
          e.stopPropagation()
          if ($(this).hasClass('music')) {
            // 选音乐
            $('.modal-music').fadeIn()
          } else if ($(this).hasClass('text')) {
            // 选祝福
            $('.modal-text').fadeIn()
          } else {
            // 选贺卡
            window.location.pathname = '/greeting'
          }
        })
        // 关闭工具栏
        $('.play-container').click(function (e) {
          var toolbar = $('.toolbar')
          if (toolbar.css('display') !== 'none') {
            toolbar.slideUp()
            $('.toggle-tool').removeClass('hide')
          }
        })
        // 关闭引导层
        $('.guide .close img').click(function (e) {
          $('.guide').hide()
        })
        // 上传背景
        $('.upload').click(function (e) {
          // play.methods.uploadImg()
          play.methods.actionSheet()
        })
        // 音乐选择框操作
        $('.modal-music').click(function (e) {
          e.stopPropagation()
          var target = $(e.target),
            dialog = $('.modal-music')
          if (target.hasClass('cancel')) { // 取消选择框
            dialog.fadeOut()
            return
          }
          if (target.hasClass('submit')) { // 搜索音乐
            play.methods.searchMusic(target.prev().val())
            return
          }
          if (target.hasClass('confirm')) { // 确认选择
            dialog.hide()
            play.methods.changeMusic(dialog.find('input:checked').val())
          }
        })
        // 文本选择框
        $('.modal-text').click(function (e) {
          e.stopPropagation()
          var target = $(e.target),
            dialog = $('.modal-text'),
            current = dialog.find('.header .current')
          if (target.hasClass('cancel')) { // 取消文本选择
            dialog.fadeOut()
            return
          }
          if (target.hasClass('choose') || target.hasClass('edit')) { // 切换选择
            target.addClass('current').siblings().removeClass('current')
            if (target.hasClass('choose')) { // 当前为选祝福
              dialog.find('.section.list').show()
              dialog.find('.section.custom').hide()
            } else { // 自定义输入
              dialog.find('.section.list').hide()
              dialog.find('.section.custom').show()
            }
            return
          }
          if (target.hasClass('confirm')) { // 确认选择
            if (current.hasClass('choose')) { // 选择祝福
              var text = dialog.find('.list input:checked').parents('li').find('.details').text()
              $('.text-box .content').text(text)
            } else {
              play.methods.customGreet(dialog.find('textarea').val())
            }
          }
        })
      },
      methods: {
        /**
         * 搜索音乐
         * @param key { String } 搜索关键字
         */
        searchMusic (key) {
          console.log(key)
          // todo
        },
        /**
         * 更换背景音乐
         * @param id { String } 更换背景音乐的id值
         */
        changeMusic (id) {
          console.log(id)
          // todo
        },
        /**
         * 自定义祝福内容
         * @param text { String } 输入的内容
         */
        customGreet (text) {
          console.log(text)
          // todo
        },
        /**
         * 打开选择框
         */
        actionSheet () {
          weui.actionSheet(
            [
              {
                label: '从手机选择',
                onClick: function () {
                  play.methods.uploadImg()
                  $('.upload input').show()
                    .click()
                    .hide()
                }
              },
              {
                label: '从图库选择',
                onClick: function () {
                  console.log('从相册选择')
                }
              }
            ],
            [
              {
                label: '取消',
                onClick: function () {
                  console.log('取消')
                }
              }
            ]
          )
        },
        /**
         * 上传图片
         */
        uploadImg () {
          console.log(1)
          var loading
          weui.uploader('.upload', {
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
              // var item = $(`<li class="temporary"><div class="box"><img src="${this.base64 || this.url}"></div></li>`)
              // console.log(this)
              // $('.bg .upload').before(item)
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
              $(loading).find('.weui-toast__content').text('已上传' + procent)
              return true // 阻止默认行为，不使用默认的进度显示
            },
            onSuccess: function (ret) {
              // console.log(this, ret)
              loading.hide()
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
        }
      }
    }
    play.init()
  })
})
