window.addEventListener('load', function () {
  $(function () {
    var daily = {
      data: {
        status: 1 // 0 用户未关注；1用户未打卡；2用户已打卡
      },
      init () {
        this.attachEvent()
      },
      attachEvent () {
        // 顶部标签切换
        $('.navbar').on('click', '>a', function (e) {
          e.preventDefault()
          var hour = new Date().getHours()
          if ($(this).hasClass('morning')) {
            window.location.pathname = '/clock-in/graph.html'
            return
          }
          if ($(this).hasClass('news')) {
            if (hour < 9) {
              weui.alert('新闻播报每天9:00开放')
            } else {
              window.location.pathname = '/clock-in/news.html'
            }
            return
          }
          if ($(this).hasClass('music')) {
            if (hour < 9) {
              weui.alert('你来听歌每天12:00开放')
            } else {
              window.location.pathname = '/clock-in/music.html'
            }
            return
          }
          if ($(this).hasClass('daily')) {
            if (hour < 9) {
              weui.alert('爱上夜读每天21:00开放')
            } else {
              window.location.pathname = '/clock-in/daily.html'
            }
          }
        })
        // 播放暂停切换
        $('.audio-box').on('click', '.toggle', function (e) {
          $(this).toggleClass('pause')
          var audio = $('#audio')[0]
          if ($(this).hasClass('pause')) {
            audio.play()
          } else {
            audio.pause()
          }
        })
        // 给留言点赞
        $('.list').on('click', '.zan>span', function (e) {
          var type
          if ($(this).hasClass('agree')) { // 取消点赞
            $(this).removeClass('agree').find('.nav-icon').html('&#xe658')
            type = 'remove'
          } else { // 添加点赞
            $(this).addClass('agree').find('.nav-icon').html('&#xe657')
            type = 'add'
          }
          daily.methods.agreeMessage($(this).parents('li'), type)
        })
        // 点赞和投诉文章库
        $('.statistics').on('click', '.zan,.complaint', function (e) {
          if ($(this).hasClass('complaint')) { // 投诉操作
            $('.modal-complaint').show()
          } else if ($(this).hasClass('agree')) { // 取消点赞
            $(this).removeClass('agree').find('.nav-icon').html('&#xe658')
            daily.methods.agreeArticle($(this).parents('.statistics'), 'remove')
          } else { // 点赞
            $(this).addClass('agree').find('.nav-icon').html('&#xe657')
            daily.methods.agreeArticle($(this).parents('.statistics'), 'add')
          }
        })
        // 留言操作
        $('.message>a').click(function (e) {
          daily.methods.callMessage()
        })
        // 关闭和提交留言
        $('.modal-message').on('click', '.mask,.submit', function (e) {
          if ($(this).hasClass('submit')) { // 提交留言
            var message = $(e.delegateTarget).find('textarea').val()
            if (message) {
              daily.methods.sendMessage(message)
            }
          }
          $('.modal-message').hide()
            .find('.mask').fadeOut()
            .end().find('.content').slideToggle()
        })
        // 打开打赏对话框
        $('.library-box .reward').click(function (e) {
          $('.modal-reward').show()
        })
        // 关闭和打赏操作
        $('.modal-reward').on('click', '.close', function (e) { // 关闭
          $('.modal-reward').hide()
        }).on('click', 'li', function (e) { // 切换金额
          $(this).addClass('selected').siblings().removeClass('selected')
          $('.amount input').val('')
        }).on('click', '.pay', function (e) { // 支付操作
          var amount = $('.amount input').val()
          amount = amount > 0 ? amount : parseFloat($('.modal-reward li.selected').text())
          $('.modal-reward').hide()
          daily.methods.pay(amount)
        })
        // 换成我的
        $('.img-box .convert').click(function (e) {
          daily.methods.checkStatus()
        })
        // 关闭换成我的提示框
        $('.modal-follow').on('click', '.close,.cancel,.no,.yes', function (e) {
          $('.modal-follow').hide()
          if ($(this).hasClass('yes')) { // 去打卡
            daily.methods.goClock()
          }
        })
        // 关闭和提交投诉信息
        $('.modal-complaint').on('click', '.close,.submit', function (e) {
          var modal = $('.modal-complaint')
          if ($(this).hasClass('submit')) { // 提交
            var data = {
              name: modal.find('.name').val(),
              tel: modal.find('.tel').val(),
              content: modal.find('.desc').val()
            }
            if (data.name && data.tel && data.content) {
              daily.methods.complaint(data)
            } else {
              weui.alert('请务正确填写信息，方便客服及时处理')
              return
            }
          }
          modal.hide()
        })
      },
      methods: {
        /**
         * 留言点赞操作
         * @param target { Object } 当前点击留言信息的li标签Jquery对象
         * @param type { String } [remove] 取消点赞；[add] 添加点赞
         */
        agreeMessage (target, type) {
          // todo 可以从target中获取有用的信息
          if (type === 'add') {
            // todo
          } else if (type === 'remove') {
            // todo
          }
        },
        /**
         * 文章点赞操作
         * @param target { Object } 当前点击的文章统计.statistics标签Jquery对象
         * @param type { String } [remove] 取消点赞；[add] 添加点赞
         */
        agreeArticle (target, type) {
          // todo 可以从target中获取有用的信息
          if (type === 'add') {
            // todo
          } else if (type === 'remove') {
            // todo
          }
        },
        /**
         * 支付操作
         * @param amount { Number } 支付金额
         */
        pay (amount) {
          // todo 支付逻辑
          console.log(amount)
        },
        /**
         * 检查用户关注和打卡状态
         */
        checkStatus () {
          // todo 获取用户状态
          var modal = $('.modal-follow')
          switch (daily.data.status) {
            case 0:// 用户未关注
              modal.removeClass('follow').show()
              break
            case 1:// 用户已经关注且未打卡
              modal.addClass('follow').show()
              break
            case 2: // 用户已打卡
              // todo 直接换成我的
              break
            default: return false
          }
        },
        /**
         * 去打卡逻辑
         */
        goClock () {
          // todo
        },
        /**
         * 投诉建议
         * @param data { Object } {name:'',tel:'',content:''}
         */
        complaint (data) {
          // todo
          console.log(data)
        },
        /**
         * 提交留言信息
         * @param msg { String } 提交的留言内容
         */
        sendMessage (msg) {
          // todo
        },
        /**
         * 调用留言框
         */
        callMessage () {
          if (daily.data.status !== 0) { // 用户已关注
            $('.modal-message').show()
              .find('.mask').fadeIn()
              .end().find('.content').slideToggle()
          } else { // 用户未关注
            weui.confirm('你还没有注册链脉名片，现在去注册？', function (e) {
              // todo 将页面跳转到注册页
            }, function (e) {
              // todo 用户不注册
            })
          }
        }
      }
    }
    daily.init()
    var scroll = {
      data: {
        startY: 0,
        distance: 0,
        fontSize: parseFloat($('html').css('fontSize'))
      },
      init () {
        this.attachEvent()
      },
      attachEvent () {
        $(window).on('touchstart', function (e) {
          scroll.data.startY = e.originalEvent.changedTouches[0].screenY
        })
        $(window).on('touchmove', function (e) {
          scroll.data.distance = e.originalEvent.changedTouches[0].screenY - scroll.data.startY
        })
        $(window).on('scroll', function (e) {
          requestAnimationFrame(scroll.methods.handleScroll)
        })
        $('.to-top').click(function (e) {
          $(window).scrollTop(0)
        })
      },
      methods: {
        handleScroll () {
          var top = $(window).scrollTop()
          if (scroll.data.distance > 0) { // 下滑
            $('.to-top').show()
          } else { // 上滑
            if (top <= scroll.data.fontSize * 1) {
              $('.navbar').css({top: '-' + top + 'px'})
            }
            $('.to-top').hide()
          }
          if (top <= 0) { // 滑到顶部
            $('.audio-box').removeClass('fixed')
            $('.navbar').css({top: 0})
            $('.to-top').hide()
          }
          if (top > scroll.data.fontSize * 1.1) {
            $('.audio-box').addClass('fixed')
            $('.navbar').css({top: '-' + scroll.data.fontSize + 'px'})
          }
        }
      }
    }
    scroll.init()
  })
})
