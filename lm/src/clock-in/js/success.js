window.addEventListener('load', function () {
  $(function () {
    var success = {
      data: {},
      init () {
        this.attachEvent()
      },
      attachEvent () {
        // 打开打赏对话框
        $('.animate-box').click(function (e) {
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
          success.methods.pay(amount)
        })
        // 打开铃铛对话框
        $('.header-box .notice').click(function () {
          $('.modal-lingdang').show()
        })
        // 收听早安播报
        $('.modal-lingdang .listen').click(function () {
          success.methods.listen()
          $('.modal-lingdang').hide()
        })
        // 复制早安语
        $('.btns').on('click', '.copy', function (e) {
          var lang = $('.text-box .text').text()
          var clipboard = new Clipboard('.btns .copy', {
            text: function () {
              return lang;
            }
          })
          clipboard.on('success', function (e) {
            $('.modal-copy').show()
          })
          clipboard.on('error', function (e) {
            weui.alert('复制失败，请手动复制')
          })
        }) // 生成邀请海报
          .on('click', '.generate', function (e) {
            $('.modal-invite').show()
            success.methods.generate()
          })
      },
      methods: {
        /**
         * 打赏支付
         * @param amount {Number} 支付金额
         */
        pay (amount) {
          // todo 支付逻辑
        },
        // 生成邀请海报
        generate () {
          // todo
        },
        // 马上收听早安播报
        listen () {
          // todo
        }
      }
    }
    success.init()
    var carousel = {
      data: {
        current: 0, // 当前页
        length: 3, // 最大页数
        target: null, // 移动的目标
        distance: 5, // 每次移动的距离（rem）
        duration: 500, // 动画持续时间
        hasMore: true, // 是否有更多
        src: '' // 最新的图片地址
      },
      init (target) {
        this.data.target = target
        this.attachEvent()
      },
      attachEvent () {
        $('.picture').on('click', '>span', function (e) {
          if ($(this).hasClass('arrow-left')) {
            carousel.methods.moveRight()
            return
          }
          if ($(this).hasClass('arrow-right')) {
            carousel.methods.moveLeft()
          }
        })
      },
      methods: {
        moveRight () {
          if (carousel.data.current === 0) {
            return
          }
          carousel.methods.move(1)
          carousel.data.current--
          console.log(carousel.data)
        },
        moveLeft () {
          if (carousel.data.current === 1) {
            carousel.methods.hasMore()
          }
          if (carousel.data.current === carousel.data.length - 1) { // 目前是最后一页
            if (carousel.data.hasMore) {
              var html = `<li><a href="javascript:;"><img src="${carousel.data.src}"></a></li>`
              carousel.data.length++
              carousel.data.target.append($(html))
              carousel.methods.hasMore()
            } else {
              return
            }
          }
          carousel.methods.move(-1)
          carousel.data.current++
          console.log(carousel.data)
        },
        move (n) {
          var currentX = -carousel.data.current * carousel.data.distance
          carousel.data.target.css({
            transform: `translateX(${currentX + carousel.data.distance * n}rem)`,
            transition: `all ${carousel.data.duration}ms`
          })
        },
        hasMore () {
          // todo 到后台获取是否有更多的信息
          // 如果还有信息就执行下面的代码
          var result = {
            hasMore: true,
            src: 'xxxx'
          }
          if (result) {
            carousel.data.hasMore = result.hasMore
            carousel.data.src = result.src
          } else {
            carousel.data.hasMore = false
            carousel.data.src = ''
          }
        }
      }
    }
    carousel.init($('.list-box ul'))
  })
})
