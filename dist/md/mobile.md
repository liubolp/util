### 关于移动端网页开发的基本信息
> [移动端web解决方案](http://www.cnblogs.com/liulinjie/p/5663015.html)

```
  // 移动端视口设定
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  // 是否全屏展示
  <meta name="apple-mobile-app-capable" content="yes">
  // 状态栏样式
  <meta name="apple-mobile-app-status-bar-style" content="black">
  // 自动识别电话号码
  <meta name="format-detection" content="telephone=no">
  // 字体设置
  <style>
    // 定义字体名
    @font-face:{
      font-family: '字体名';
      src: url('目标字体文件.ttf') format(truetype)
      // 目前主流浏览器引入该字体就行了
      // 如果字体文件较小可以转换为base64后引入
      // src: url('data:application/octet-stream;base64,${文件的base64信息}')
    }
    .iconfont {
      font-family:"字体名" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased; // 用于字体抗锯齿
      -moz-osx-font-smoothing: grayscale;
    }
  </style>
```
