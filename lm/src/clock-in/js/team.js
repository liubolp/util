window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      canCreateTeam: false, // 是否可以创建团队
      hasTeam: true, // 是否已经有团队
      joinOther: false, // 加入其它团队
      target: null, // 排名用户点击时的身份信息
      teamName: '你猜我是谁' // 团队名称
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 打开菜单
      $('.name-box .toggle').click(function (e) {
        $('.menu-box').show()
      })
      // 菜单点击操作
      $('.menu-box').on('click', 'li', function (e) {
        e.stopPropagation()
        if ($(this).hasClass('more')) { // 更多
          console.log('更多')
        } else if ($(this).hasClass('create')) { // 创建
          app.methods.createTeam()
        } else if ($(this).hasClass('exit')) { // 退出
          $('.modal-exit').show()
        } else if ($(this).hasClass('modify')) { // 修改团队名称
          $('.modal-modify').show().find('input').val(app.data.teamName)
        }
        $(e.delegateTarget).hide()
      }).click(function (e) {
        $(this).hide()
      })
      // 提醒好友打卡
      $('.list').on('click', '.notice', function (e) {
        app.data.target = $(this).attr('data-id')
        app.methods.inviteFriends(2)
      })
      // 加入团队
      $('button.join').click(function () {
        if (!app.data.hasTeam) {
          $('.modal-join').show()
        } else if (app.data.joinOther) {
          $('.modal-join-other').show()
        } else { // 邀请好友
          app.methods.inviteFriends(0)
        }
      })
      // 打卡操作
      $('button.clock.begin').click(function () {
        app.methods.clock()
      })
      // 创建团队弹窗操作
      $('.modal-create').on('click', '.confirm,.cancel,.mask', function (e) {
        if ($(this).hasClass('confirm')) { // 邀请好友打卡
          $('.modal-invite').show()
          app.methods.inviteFriends(1)
        }
        $(e.delegateTarget).hide()
      })
      // 邀请好友操作
      $('.modal-invite').on('click', '.confirm,.cancel,.mask', function (e) {
        $(e.delegateTarget).hide()
      })
      // 退出团队操作
      $('.modal-exit').on('click', '.confirm,.cancel,.mask', function (e) {
        if ($(this).hasClass('confirm')) { // 退出团队
          app.methods.exitTeam()
        }
        $(e.delegateTarget).hide()
      })
      // 加入团队操作
      $('.modal-join-other,.modal-join').on('click', '.confirm,.cancel,.mask', function (e) {
        if ($(this).hasClass('confirm')) { // 加入
          app.methods.joinTeam()
        }
        $(e.delegateTarget).hide()
      })
      // 关闭引导
      $('.modal-share .close').click(function (e) {
        $('.modal-share').hide()
      })
      // 修改团队
      $('.modal-modify').on('click', '.confirm,.cancel,.mask', function (e) {
        if ($(this).hasClass('confirm')) { // 确定修改
          app.data.teamName = $(e.delegateTarget).find('input').val()
          app.methods.modifyName(app.data.teamName)
        }
        $(e.delegateTarget).hide()
      })
    },
    methods: {
      /**
       * 加入团队
       */
      joinTeam () {
        console.log('加入团队')
      },
      /**
       * 创建团队
       */
      createTeam () {
        if (app.data.canCreateTeam) {
          // todo
        } else {
          $('.modal-create').show()
        }
      },
      /**
       * 邀请好友
       * @param type { Number } 0:邀请好友加入团队；1邀请海报；2提醒好友打卡
       */
      inviteFriends (type) {
        switch (type) {
          case 0:
            console.log('喊好友加入团队')
            $('.modal-share').show()
            break
          case 1:
            console.log('邀请海报')
            break
          case 2:
            var id = app.data.target
            console.log('提醒打卡', id)
            break
          default:
            break
        }
      },
      /**
       * 退出团队
       */
      exitTeam () {
        console.log('退出')
      },
      /**
       * 打卡操作
       */
      clock () {
        console.log('打卡操作')
        // todo 成功后去掉begin
        $('button.begin').removeClass('begin')
      },
      /**
       * 修改团队名称
       * @param name
       */
      modifyName (name) {
        console.log(name)
      }
    }
  }
  app.init()
})
