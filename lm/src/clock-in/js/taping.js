window.addEventListener('load', function () {
  $(function () {
    var obj = {
      data: {
        timer: null, // 倒计时操作
        timeout: null, // 录音超时
        limit: 10, // 最大录音时长
        duration: 55 // 实际录制时长
      },
      init: function () {
        this.event()
      },
      event: function () {
        // 使用官方播报
        $('.taping').on('click', '.official', function (e) {
          $('.modal-official').show()
        }) // 打开和关闭背景音乐
          .on('click', '.toggle-bg', function (e) {
            var type = 'off'
            if ($(this).hasClass('on')) { // 如果是开启状态就关闭
              $(this).removeClass('on').text('打开背景音乐')
              type = 'off'
            } else {
              $(this).addClass('on').text('关闭背景音乐')
              type = 'on'
            }
            obj.methods.toggleBg(type)
          })
          // 录制自定义语音
          .on('click', '.record', function (e) {
            if ($(this).hasClass('recording')) { // 结束录制
              obj.methods.endRecord()
              obj.methods.clearTimer()
              $(this).removeClass('recording').text('')
              $('.modal-record').show()
                .find('.bar').text(obj.data.duration + '"')
            } else { // 开始录制
              obj.methods.countDown($(this).addClass('recording').text(obj.data.limit))
              obj.methods.startRecord()
            }
          })
        // 使用官方语音播报
        $('.modal-official .generate').click(function (e) {
          obj.methods.generate('official')
          $('.modal-official').hide()
        })
        // 自定义语音播报
        $('.modal-record').on('click', '.play', function (e) { // 播放当前录制语音
          if ($(this).hasClass('pause')) {
            $(this).removeClass('pause').next().removeClass('animate')
            obj.methods.stopPlay()
          } else {
            $(this).addClass('pause').next().addClass('animate')
            obj.methods.playVoice()
          }
        }).on('click', '.re', function (e) { // 重新录制
          $('.modal-record').hide()
          $('.taping .record').trigger('click')
        }).on('click', '.generate', function (e) {
          $('.modal-record').hide()
          obj.methods.generate()
        })
      },
      methods: {
        // 生成语音播报
        generate (type) {
          if (type === 'official') {
            // todo 使用官方播报
          } else {
            // todo 使用自定义语音播报
          }
        },
        // 倒计时操作
        countDown (target) {
          obj.data.timeout = setTimeout(function () {
            clearInterval(obj.data.timer)
            $('.taping .record').trigger('click')
          }, obj.data.limit * 1000)
          obj.data.timer = setInterval(function () {
            var count = target.text() - 1
            target.text(count)
          }, 1000)
        },
        // 清楚计时器
        clearTimer () {
          clearTimeout(obj.data.timeout)
          clearInterval(obj.data.timer)
        },
        // 开始录制
        startRecord () {
          // todo 调用接口开始录制
        },
        // 结束录制
        endRecord () {
          // todo 结束录制并获取录制时长duration
          obj.data.duration = 30 // (单位秒)
        },
        // 播放声音
        playVoice () {
          // todo
        },
        // 停止播放
        stopPlay () {
          // todo
        },
        // 切换背景
        toggleBg (type) {
          console.log(type)
          if (type === 'on') {
            // TODO 打开背景音乐
          } else {
            // TODO 关闭背景音乐
          }
        }
      }
    }
    obj.init()
  })
})
