window.addEventListener('DOMContentLoaded', function () {
  var app = {
    data: {
      parent: null, // 添加列表项时对应的模块
      target: null // 修改时对应的列表项
    },
    init () {
      this.attachEvent()
    },
    attachEvent () {
      // 工作经历编辑框
      $('.modal-experience').on('click', '.mask,.edit-submit', function (e) {
        var modal = $(e.delegateTarget)
        if ($(this).hasClass('edit-submit')) {
          var data = {
            company: modal.find('[name=company]').val(),
            post: modal.find('[name=post]').val(),
            'start-date': modal.find('[name=start-date]').val(),
            'end-date': modal.find('[name=end-date]').val(),
            'details': modal.find('[name=details]').val()
          }
          app.methods.addItem('experience', app.data.parent, data)
        }
        $(e.delegateTarget).hide().find('.mask').hide()
          .end().find('.content').slideToggle()
      })
      // 教育经历编辑框
      $('.modal-education').on('click', '.mask,.edit-submit', function (e) {
        var modal = $(e.delegateTarget)
        if ($(this).hasClass('edit-submit')) {
          var data = {
            school: modal.find('[name=school]').val(),
            major: modal.find('[name=major]').val(),
            education: modal.find('[name=education]').val(),
            'start-date': modal.find('[name=start-date]').val(),
            'end-date': modal.find('[name=end-date]').val(),
            'details': modal.find('[name=details]').val()
          }
          app.methods.addItem('education', app.data.parent, data)
        }
        $(e.delegateTarget).hide().find('.mask').hide()
          .end().find('.content').slideToggle()
      })
      // 添加处理
      $('.add.experience,.add.education').click(function (e) {
        if ($(this).hasClass('experience')) {
          $('.modal-experience').show().find('.mask').show()
            .end().find('.content').slideToggle()
        }
        if ($(this).hasClass('education')) {
          $('.modal-education').show().find('.mask').show()
            .end().find('.content').slideToggle()
        }
        app.data.target = null
        app.data.parent = $(this).parent().next()
      })
      // 编辑信息
      $('.add-list').on('click', 'span.edit', function (e) {
        var data = $(this).data().info, type = $(this).attr('data-type')
        app.data.target = $(this).parents('li')
        app.methods.updateItem(type, data)
      })
      // 兴趣爱好操作
      $('.pick-list').on('click', 'li', function (e) {
        $(this).toggleClass('selected')
      })
      // 调用日期
      $('[name=start-date],[name=end-date]').click(function (e) {
        app.methods.callDate($(this))
      })
      // 选择专业
      $('[name=education]').click(function (e) {
        app.methods.callPick($(this))
      })
    },
    methods: {
      /**
       * 添加工作经历和教育经历
       * @param type {String} 'experience'工作；'education'教育
       * @param target {Object} 列表ul Jquery对象
       * @param data {Object} 表单输入的数据
       */
      addItem (type, target, data) {
        var item
        if (type === 'experience') {
          target.find('li.nothing').hide()
          item = `
          <li class="add-item">
            <a href="javascript:;">
              <img src="images/vip.png">
            </a>
            <div class="content">
              <p class="name">${data.company}</p>
              <p class="desc">
                <span class="time">${data['start-date']}-${data['end-date']},</span>
                <span class="post">${data.post}</span>
              </p>
              <div class="details">${data.details}</div>
            </div>
            <div class="operation">
              <span class="edit" data-type="experience">编辑</span>
            </div>
          </li>`
        } else {
          item = `
          <li class="add-item">
            <a href="javascript:;">
              <img src="images/vip.png">
            </a>
            <div class="content">
              <p class="name">${data.school}</p>
              <p class="desc">
                <span class="time">${data['start-date']}-${data['end-date']},</span>
                <span class="post">${data.major},</span>
                <span>${data.education}</span>
              </p>
              <div class="details">${data.details}</div>
            </div>
            <div class="operation">
              <span class="edit" data-type="education">编辑</span>
            </div>
          </li>`
        }
        if (app.data.target) { // 修改
          app.data.target.replaceWith($(item).find('.edit').data('info', data).end())
        } else { // 新增
          target.find('li.nothing').remove()
          target.append($(item).find('.edit').data('info', data).end())
        }
      },
      /**
       * 更新经历数据
       * @param type {String} 经历类型'experience'工作；'education'教育
       * @param data {Object} 已有经历信息
       */
      updateItem (type, data) {
        var modal
        if (type === 'education') {
          modal = $('.modal-education')
          modal.find('[name=school]').val(data.school)
          modal.find('[name=major]').val(data.major)
          modal.find('[name=education]').val(data.education)
          modal.find('[name=start-date]').val(data['start-date'])
          modal.find('[name=end-date]').val(data['end-date'])
          modal.find('[name=details]').val(data.details)
          modal.show().find('.mask').show()
            .end().find('.content').slideToggle()
        } else {
          modal = $('.modal-experience')
          modal.find('[name=company]').val(data.company)
          modal.find('[name=post]').val(data.post)
          modal.find('[name=start-date]').val(data['start-date'])
          modal.find('[name=end-date]').val(data['end-date'])
          modal.find('[name=details]').val(data.details)
          modal.show().find('.mask').show()
            .end().find('.content').slideToggle()
        }
      },
      callDate (target) {
        weui.datePicker({
          start: 1900, // 从今天开始
          end: new Date(),
          defaultValue: new Date().toLocaleDateString().split('/'),
          onConfirm: function (result) {
            console.log(result)
            target.val(result[0].value + '-' + result[1].value)
          }
        })
      },
      callPick (target) {
        weui.picker([{
          label: '飞机票',
          value: 0,
          disabled: true // 不可用
        }, {
          label: '火车票',
          value: 1
        }, {
          label: '汽车票',
          value: 3
        }, {
          label: '公车票',
          value: 4
        }], {
          container: 'body',
          defaultValue: [3],
          onConfirm: function (result) {
            target.val(result[0].label)
          }
        })
      }
    }
  }
  app.init()
})
