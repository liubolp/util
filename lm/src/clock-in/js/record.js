window.addEventListener('load', function () {
  $(function () {
    var moment = window.moment
    var dateFunc = {
      getMonthViewStartDate (date, firstDay) {
        firstDay = parseInt(firstDay)
        let start = moment(date)
        let startOfMonth = moment(start.startOf('month'))

        start.subtract(startOfMonth.day(), 'days')

        if (startOfMonth.day() < firstDay) {
          start.subtract(7, 'days')
        }

        start.add(firstDay, 'days')

        return start
      },
      getMonthViewEndDate (date) {
        return this.getMonthViewStartDate().add(6, 'weeks')
      }
    }
    var buffer = {
      currentMonth: moment().startOf('month'),
      firstDay: 0
    }
    // 本地时间配置
    moment.defineLocale('zh-cn', {
      months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
      monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
      weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY年MMMD日',
        LL: 'YYYY年MMMD日',
        LLL: 'YYYY年MMMD日Ah点mm分',
        LLLL: 'YYYY年MMMD日ddddAh点mm分',
        l: 'YYYY年MMMD日',
        ll: 'YYYY年MMMD日',
        lll: 'YYYY年MMMD日 HH:mm',
        llll: 'YYYY年MMMD日dddd HH:mm'
      },
      meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
      meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
          hour = 0
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
          meridiem === '上午') {
          return hour
        } else if (meridiem === '下午' || meridiem === '晚上') {
          return hour + 12
        } else {
          // '中午'
          return hour >= 11 ? hour : hour + 12
        }
      },
      meridiem: function (hour, minute, isLower) {
        var hm = hour * 100 + minute
        if (hm < 600) {
          return '凌晨'
        } else if (hm < 900) {
          return '早上'
        } else if (hm < 1130) {
          return '上午'
        } else if (hm < 1230) {
          return '中午'
        } else if (hm < 1800) {
          return '下午'
        } else {
          return '晚上'
        }
      },
      calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
      },
      dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
      ordinal: function (number, period) {
        switch (period) {
          case 'd':
          case 'D':
          case 'DDD':
            return number + '日'
          case 'M':
            return number + '月'
          case 'w':
          case 'W':
            return number + '周'
          default:
            return number
        }
      },
      relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        m: '1 分钟',
        mm: '%d 分钟',
        h: '1 小时',
        hh: '%d 小时',
        d: '1 天',
        dd: '%d 天',
        M: '1 个月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年'
      },
      week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
      }
    })
    function getCalendar () {
      let monthViewStartDate = dateFunc.getMonthViewStartDate(buffer.currentMonth, buffer.firstDay)
      let calendar = []

      for (let perWeek = 0; perWeek < 6; perWeek++) {
        let week = []

        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), 'day'),
            isCurMonth: monthViewStartDate.isSame(buffer.currentMonth, 'month'),
            weekDay: perDay,
            date: moment(monthViewStartDate)
          })

          monthViewStartDate.add(1, 'day')
        }

        calendar.push(week)
      }

      return calendar
    }
    function updateCalendar () {
      var list = getCalendar(), html = ''
      list.forEach(function (week) {
        week.forEach(function (day) {
          html += `<li class="${day.isCurMonth ? 'cur-month' : ''}">
                    <span>${day.monthDay}</span>
                  </li>`
        })
      })
      var current = buffer.currentMonth.locale('zh-cn').format('YYYY年MMM')
      $('.calendar-days').html(html)
      $('.calendar-header span').html(current)
    }
    console.log(getCalendar())
    updateCalendar()
    // 改变月份逻辑处理
    $('.calendar-header').on('click', 'i', function (e) {
      // todo 获取数据库中其他日期的打卡记录信息
      if ($(this).hasClass('prev')) {
        // prev month
        buffer.currentMonth = moment(buffer.currentMonth).subtract(1, 'months').startOf('month')
      } else {
        // next month
        buffer.currentMonth = moment(buffer.currentMonth).add(1, 'months').startOf('month')
      }
      updateCalendar()
    })
      .on('click', 'span', function (e) { // 快速回到当前日期
        buffer.currentMonth = moment().startOf('month')
        updateCalendar()
      })
    $('.calendar-days').on('click', 'li', function (e) {
      // todo 读取标签里的数据
      $(this).addClass('selected').siblings().removeClass('selected')
      //if ($)
      var record = $(this).prop('data-time') || '06:50'
      var count = $(this).prop('data-count') || 100
    })
  })
})
