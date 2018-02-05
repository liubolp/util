window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      formType: '', // 当前选中的表单类型
      src: '', // 当前也是设置的背景音乐地址
      musicList: ['http://web.lm720.com/upload/careershow/2017/11/49/music.mp3'] // 存放所有供加载的音乐地址列表
    },
    init () {
      this.attachEvent()
      this.methods.loadMusic()
      app.methods.initScroll('#article>.header')
    },
    attachEvent () {
      // 关闭顶部广告
      $('.tips .close').click(function (e) {
        $('.tips').slideUp()
      })
      // 打开背景音乐选择框
      $('.personal button').click(function (e) {
        $('.modal-music').fadeIn()
      })
      // 背景音乐弹窗处理
      $('.modal-music').on('click', '.mask,li,.footer,.title>span', function (e) {
        if (this.nodeName === 'SPAN') { // 切换类型
          var type = $(this).attr('data-type')
          $(this).addClass('current').siblings().removeClass('current')
          app.methods.changeMusicType(type)
          return
        }
        if (this.nodeName === 'LI') { // 选择音乐
          var audio = $('#audio'), src = $(this).attr('data-src')
          $(this).addClass('current').siblings().removeClass('current')
          audio[0].pause()
          if (src) {
            audio.attr('src', src)[0].play()
            app.data.src = src
          }
        }
        $(e.delegateTarget).hide()
      })
      // 添加表单
      $('.add-form').click(function (e) {
        $('.modal-form').fadeIn()
      })
      // 删除表单
      $('.forms .remove').click(function (e) {
        e.stopPropagation()
        $('.operations .forms').hide()
          .prev().show()
        app.data.formType = ''
      })
      // 重新选择表单
      $('.forms').click(function (e) {
        $('.modal-form').fadeIn()
      })
      // 表单选择处理
      $('.modal-form').on('click', '.mask,.footer,li', function (e) {
        if (this.nodeName === 'LI') {
          app.data.formType = $(this).attr('data-type')
          $(this).addClass('current').siblings().removeClass('current')
          $('.operations .forms').removeAttr('class').addClass('forms type' + app.data.formType).show()
          $('.add-form').hide()
        }
        $(e.delegateTarget).hide()
      })
      // 广告控制
      $('.swatch-list').on('click', '.right', function (e) {
        var status,card = $('.business-card')
        if ($(this).hasClass('advertising')) { // 底部广告
          status = $(this).find('input').prop('checked')
          $('.card').find('input').prop('checked', !status)
          if (status) {
            card.hide()
          } else {
            card.show()
          }
        } else if ($(this).hasClass('card')) { // 微名片
          status = $(this).find('input').prop('checked')
          $('.advertising').find('input').prop('checked', !status)
          if (status) {
            card.show()
          } else {
            card.hide()
          }
        }
      })
      // 发布文章
      $('button.publish').click(function (e) {
        app.methods.publish()
      })
    },
    methods: {
      /**
       * 更改背景音乐类型
       * @param type { String } 音乐类型
       */
      changeMusicType (type) {
        console.log(type)
        // todo
      },
      loadMusic (list) {
      },
      /**
       * 发布文章信息
       */
      publish () {
        switch (app.data.formType) {
          case '1': // 类型1
            break
          case '2': // 类型2
            break
          case '3': // 类型3
            break
          case '4': // 类型4
            break
          default: // 没有表单
            break
        }
        var status = this.getStatus(),
          info = this.getCardInfo()
        console.log(status, info, app.data.formType)
      },
      /**
       * 获取用户输入的名片介绍信息
       * @returns {{desc: (*|jQuery), source: (*|jQuery), expect: (*|jQuery)}}
       */
      getCardInfo () {
        var desc = $('textarea[name=desc]').val(),
          source = $('textarea[name=source]').val(),
          expect = $('textarea[name=expect]').val()
        return {desc, source, expect}
      },
      /**
       * 获取广告控制状态
       * @returns {{advertising: (*|jQuery), reward: (*|jQuery), businessCard: boolean}}
       */
      getStatus () {
        var advertising = $('input[name=advertising]').prop('checked'),
          reward = $('input[name=reward]').prop('checked'),
          businessCard = !advertising
        return {advertising, reward, businessCard}
      },
      // 滚动处理 start
      /**
       * 初始化滚动
       * @param selector { String } css选择器
       */
      initScroll (selector) {
        app.data.container = $(window)
        app.data.target = $(selector)
        app.data.top = app.data.target.position().top
        app.data.container.on('scroll', function (e) {
          requestAnimationFrame(app.methods.calcPosition)
        })
      },
      calcPosition () {
        var _top = app.data.container.scrollTop()
        if (_top >= app.data.top) {
          app.data.target.addClass('fixed')
        } else {
          app.data.target.removeClass('fixed')
        }
      }
      // 滚动处理 end
    }
  }
  app.init()
})
